/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import React from 'react';
import { observer } from 'mobx-react';
import { withStyles } from '@material-ui/core/styles';

import { FileConst } from '~/common/constants';

import Plupload from './Pluploader';
import GetPluploadNamespace from './GetPluploadNamespace';
import fileUploaderStyle from './styles/fileUploaderStyle';

@withStyles(fileUploaderStyle)
@observer
class FileUploader extends React.Component {
  constructor(props) {
    super(props);

    this.plupload = null;
    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    this._initPlupload();
  }

  componentWillUnmount() {
    this._destroyPlupload();
  }

  onRemoveFile = (item) => {
    this.props.attach.apiAttachDelt({
      attachid: item.id,
    });
  }

  onUpload(e) {
    this.child.doUpload(e);
  }

  _initPlupload() {
    GetPluploadNamespace(this.props.scriptUrl).then((plupload) => {
      this.plupload = plupload;
      this.setState({ isLoading: true });
    }).catch(console.error);
  }

  _destroyPlupload() {
    this.plupload = null;
  }

  render() {
    const {
      classes, uploadUrl, onBeforeUpload, multipartParams, doneFiles, onUploadComplete,
    } = this.props;
    return (
      <div className={classes.fileUploaderWrap}>
        {this.state.isLoading && (
        <Plupload
          ref={(instance) => { this.child = instance; }}
          id="plupload"
          buttonSelect="파일선택"
          multipart
          chunk_size="100mb"
          runtimes="html5, flash, silverlight, html4"
          flash_swf_url="/plugins/plupload-3.1.2/js/Moxie.swf"
          silverlight_xap_url="/plugins/plupload-3.1.2/js/Moxie.xap"
          url={uploadUrl}
          multipart_params={multipartParams}
          onBeforeUpload={onBeforeUpload}
          doneFiles={doneFiles}
          onRemoveFile={this.onRemoveFile}
          onUploadComplete={onUploadComplete}
        />
        )}
      </div>
    );
  }
}

FileUploader.defaultProps = {
  scriptUrl: '/plugins/plupload-3.1.2/js/plupload.full.min.js',
  uploadUrl: FileConst.EDITOR_UPLOAD_URL,
  multipartParams: {},
  doneFiles: [],
  onBeforeUpload: () => {},
  onUploadComplete: () => {},
};

export default FileUploader;
