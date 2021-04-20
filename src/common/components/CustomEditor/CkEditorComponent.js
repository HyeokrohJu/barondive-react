/* eslint-disable no-console */
import _ from 'lodash';
import React from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';
import { Icon } from 'react-icons-kit';
import { upload } from 'react-icons-kit/typicons/upload';

import { FileConst } from '~/common/constants';

import GetEditorNamespace from './GetEditorNamespace';
import ckEditorStyle from './styles/ckEditorStyle';

@withStyles(ckEditorStyle)
@observer
class CustomCKEditor extends React.Component {
  constructor(props) {
    super(props);

    this.element = null;
    this.editor = null;
  }

  componentDidMount() {
    this._initEditor();
  }

  componentDidUpdate(prevProps) {
    const { props, editor } = this;

    if (!editor) {
      return;
    }
    if (prevProps.data[prevProps.id] !== props.data[props.id] && editor.getData() !== props.data[props.id]) {
      setTimeout(() => {
        editor.setData(props.data[props.id]);
      }, 100);
    }

    if (prevProps.readOnly !== props.readOnly) {
      editor.setReadOnly(props.readOnly);
    }

    if (prevProps.style !== props.style) {
      editor.container.setStyles(props.style);
    }

    this._attachEventHandlers(prevProps);
  }

  componentWillUnmount() {
    this._destroyEditor();
  }

  _insertImage = (img) => () => {
    this.editor.insertHtml(`<img src="${img}" alt="" />`);
  }

  _initEditor() {
    const { config } = this.props;

    const nwConfig = {
      ...config,
      readOnly: this.props.readOnly,
      uploadUrl: this.props.uploadUrl,
      filebrowserImageUploadUrl: this.props.filebrowserImageUploadUrl,
      fileBrowserUploadMethod: this.props.fileBrowserUploadMethod,
    };

    GetEditorNamespace(this.props.scriptUrl).then((CKEDITOR) => {
      const constructor = this.props.type === 'inline' ? 'inline' : 'replace';

      if (this.props.onBeforeLoad) {
        this.props.onBeforeLoad(CKEDITOR);
      }

      this.editor = CKEDITOR[constructor](this.element, nwConfig);

      this._attachEventHandlers();

      if (this.props.style && this.props.type !== 'inline') {
        this.editor.on('loaded', () => {
          this.editor.container.setStyles(this.props.style);
        });
      }

      if (this.props.data[this.props.id]) {
        this.editor.setData(this.props.data[this.props.id]);
      }
    }).catch(console.error);
  }

  _attachEventHandlers(prevProps = {}) {
    const { props } = this;

    this.props = {
      ...props,
      onFileUploadRequest: (evt) => props.attach.fileUploadRequest(evt),
      onFileUploadResponse: (evt) => props.attach.fileUploadResponse(evt),
    };

    Object.keys(this.props).forEach((propName) => {
      if (!_.startsWith(propName, 'on') === 0 || propName === 'id' || prevProps[propName] === props[propName]) {
        return;
      }

      this._attachEventHandler(propName, prevProps[propName]);
    });
  }

  _attachEventHandler(propName, prevHandler) {
    const evtName = `${propName[2].toLowerCase()}${propName.substr(3)}`;

    if (prevHandler) {
      this.editor.removeListener(evtName, prevHandler);
    }
    this.editor.on(evtName, this.props[propName]);
  }

  _destroyEditor() {
    if (this.editor) {
      this.editor.destroy();
    }

    this.editor = null;
    this.element = null;
  }

  render() {
    const {
      classes, imgview, filethumb, attachEditorList,
    } = this.props;

    return (
      <>
        <div contentEditable="true" style={this.props.style} ref={(ref) => (this.element = ref)} />
        {imgview && attachEditorList.length > 0 && (
        <div className={classes.imgsWrap}>
          {attachEditorList && attachEditorList.map((item) => (
            <div key={item.attachid} className={classNames(classes.itemWrap, (item.filethumb === 'Y' ? 'active' : ''))}>
              <div
                role="button"
                aria-label="대표이미지 선택"
                onClick={filethumb(item)}
                onKeyPress={(filethumb(item))}
                tabIndex={-1}
                style={{ backgroundImage: `url(${item.fileurl})` }}
                className={classes.eimg}
              />
              <div
                className="addImg"
                role="button"
                aria-label="에디터 이미지삽입"
                onClick={this._insertImage(item.fileurl)}
                onKeyPress={this._insertImage(item.fileurl)}
                tabIndex={-1}
              >
                <Icon icon={upload} />
              </div>
            </div>
          ))}
        </div>
        )}
      </>
    );
  }
}

CustomCKEditor.defaultProps = {
  scriptUrl: '/plugins/ckeditor/ckeditor.js',
  type: 'classic',
  data: '',
  config: {},
  readOnly: false,
  uploadUrl: FileConst.EDITOR_UPLOAD_URL,
  filebrowserImageUploadUrl: FileConst.EDITOR_UPLOAD_URL,
  fileBrowserUploadMethod: 'xhr',
  onFileUploadRequest: () => {},
  onFileUploadResponse: () => {},
};

export default CustomCKEditor;
