/* eslint-disable no-console */
/* eslint-disable react/no-unused-state */
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Icon } from 'react-icons-kit';
import { check } from 'react-icons-kit/feather/check';
import { search } from 'react-icons-kit/feather/search';
import { plus } from 'react-icons-kit/feather/plus';
import { upload } from 'react-icons-kit/feather/upload';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

import Button from '~/material-kit/CustomButtons/Button';

import fileUploaderStyle from './styles/fileUploaderStyle';

const EVENTS = [
  'PostInit', 'Browse', 'Refresh', 'StateChanged', 'QueueChanged', 'OptionChanged',
  'BeforeUpload', 'UploadProgress', 'FileFiltered', 'FilesAdded', 'FilesRemoved', 'FileUploaded', 'ChunkUploaded',
  'UploadComplete', 'Destroy', 'Error',
];

@withStyles(fileUploaderStyle)
class Plupload extends React.Component {
  constructor() {
    super();
    this.id = new Date().valueOf();
    this.state = { files: [], uploadState: false, progress: {} };
    this.runUploader = this.runUploader.bind(this);
    this.getComponentId = this.getComponentId.bind(this);
    this.refresh = this.refresh.bind(this);
    this.initUploader = this.initUploader.bind(this);
    this.list = this.list.bind(this);
    this.clearAllFiles = this.clearAllFiles.bind(this);
    this.clearFailedFiles = this.clearFailedFiles.bind(this);
    this.removeFile = this.removeFile.bind(this);
    this.doUpload = this.doUpload.bind(this);
    this.container = null;
  }

  componentDidMount() {
    const self = this;

    if (window.plupload) {
      this.runUploader();
    } else {
      setTimeout(() => {
        if (window.plupload) {
          self.runUploader();
        } else {
          console.error('Plupload has not initialized');
        }
      }, 500);
    }
  }

  componentDidUpdate() {
    if (window.plupload) {
      this.refresh();
    }
  }

  getComponentId() {
    return this.props.id || `react_plupload_${this.id}`;
  }

  refresh() {
    // Refresh to append events to buttons again.
    this.uploader.refresh();
  }

  initUploader() {
    this.uploader = new window.plupload.Uploader(_.extend({
      container: `plupload_${this.props.id}`,
      runtimes: 'html5',
      multipart: true,
      chunk_size: '1mb',
      browse_button: this.getComponentId(),
      url: '/upload',
    }, this.props));
  }

  runUploader() {
    const self = this;
    this.initUploader();
    this.uploader.init();

    if (this.props.doneFiles.length > 0) {
      const f = self.state.files;
      _.map(this.props.doneFiles, (file) => {
        f.push(file);
      });
      self.setState({ files: f });
    }

    EVENTS.forEach((event) => {
      const handler = self.props[`on${event}`];
      if (typeof handler === 'function') {
        self.uploader.bind(event, handler);
      }
    });

    // Put the selected files into the current state
    this.uploader.bind('FilesAdded', (up, files) => {
      if (_.get(self.props, 'multi_selection') === false) {
        self.clearAllFiles();
      } else {
        self.clearFailedFiles();
      }

      const f = self.state.files;
      _.map(files, (file) => {
        f.push(file);
      });
      self.setState({ files: f }, () => {
        if (self.props.autoUpload === true) {
          self.uploader.start();
        }
      });
    });

    this.uploader.bind('FilesRemoved', (up, rmFiles) => {
      const stateFiles = self.state.files;
      const files = _.filter(stateFiles, (file) => _.find(rmFiles, { id: file.id }) !== -1);
      self.setState({ files });
    });

    this.uploader.bind('StateChanged', (up) => {
      if (up.state === window.plupload.STARTED && self.state.uploadState === false) {
        self.setState({ uploadState: true });
      }
      if (up.state !== window.plupload.STARTED && self.state.uploadState === true) {
        self.setState({ uploadState: false });
      }
    });

    this.uploader.bind('FileUploaded', (up, file) => {
      const stateFiles = self.state.files;
      _.map(stateFiles, (val, key) => {
        if (val.id === file.id) {
          const v = val;
          v.uploaded = true;
          stateFiles[key] = v;
        }
      });

      self.setState({ files: stateFiles }, () => {
        // self.removeFile(file.id);
      });
    });

    this.uploader.bind('Error', (up, err) => {
      if (_.isUndefined(err.file) !== true) {
        const stateFiles = self.state.files;
        _.map(stateFiles, (val, key) => {
          if (val.id === err.file.id) {
            const v = val;
            v.error = err;
            stateFiles[key] = v;
          }
        });
        self.setState({ files: stateFiles });
      }
    });

    this.uploader.bind('UploadProgress', (up, file) => {
      const stateProgress = self.state.progress;
      stateProgress[file.id] = file.percent;
      self.setState({ progress: stateProgress });
    });
  }

  // Display selected files
  list() {
    const self = this;
    return _.map(this.state.files, (val) => {
      if (!val) {
        return false;
      }

      const customDel = (e) => {
        e.preventDefault();
        if (self.state.uploadState === false && val.uploaded !== true) {
          self.removeFile(val.id);
        } else {
          self.props.onRemoveFile(val);
          console.log(self.state.files, val);
          const f = self.state.files.map((item) => item.attachid !== val.id && item);
          console.log(':::', f);
          self.setState({ files: f });
        }
      };

      let progressBar = '';
      if (self.state.uploadState === true && val.uploaded !== true && _.isUndefined(val.error)) {
        const percent = self.state.progress[val.id] || 0;
        progressBar = (
          <LinearProgress
            color="primary"
            variant="determinate"
            value={percent}
          />
        );
      }

      let errorDiv = '';
      if (!_.isUndefined(val.error)) {
        errorDiv = React.createElement('div', { className: 'alert alert-danger' }, `Error: ${val.error.code}, Message: ${val.error.message}`);
      }

      let iconChip;
      if (!_.isUndefined(val.uploaded)) {
        iconChip = <Avatar className="successIcon"><Icon icon={check} /></Avatar>;
      } else {
        iconChip = <Avatar className="addIcon"><Icon icon={plus} /></Avatar>;
      }

      const listItem = (
        <Chip
          avatar={iconChip}
          variant="outlined"
          label={`${val.name} (${window.plupload.formatSize(val.size)})`}
          onDelete={customDel}
        />
      );

      return React.createElement('li', { key: val.id },
        React.createElement('div', { className: 'fileItem' }, listItem), progressBar, errorDiv);
    });
  }

  clearAllFiles() {
    const { files } = this.state;
    const state = _.filter(files, (file) => {
      this.uploader.removeFile(file.id);
    });
    this.setState({ files: state });
  }

  clearFailedFiles() {
    const { files } = this.state;
    const state = _.filter(files, (file) => {
      if (file.error) {
        this.uploader.removeFile(file.id);
      }
      return !file.error;
    });
    this.setState({ files: state });
  }

  removeFile(id) {
    const { files } = this.state;
    this.uploader.removeFile(id);
    const state = _.filter(files, (file) => file.id !== id);
    this.setState({ files: state });
  }

  doUpload(e) {
    e.preventDefault();
    if (this.uploader.files.length > 0) {
      this.uploader.start();
    } else if (this.props.onUploadComplete) {
      this.props.onUploadComplete(this.uploader, this.state.files);
    }
  }

  render() {
    const { classes } = this.props;
    const list = this.list();
    return (
      <div id={`plupload_${this.props.id}`} className={classes.pluploadWrap} ref={(ref) => (this.container = ref)}>
        <div className={classes.pluploadTopWrap}>
          <h6 className={classes.subTitle}>첨부파일</h6>
          <div className={classes.btnWrap}>
            <Button
              color="info"
              size="sm"
              id={this.getComponentId()}
            >
              <Icon icon={search} /> {this.props.buttonSelect || 'Browse'}
            </Button>
          </div>
        </div>
        {this.state.files.length > 0 ? (
          <ul>
            {list}
          </ul>
        ) : (
          <div className={classes.attachWrap}>
            <Icon icon={upload} className={classes.iconTxt} /> 첨부파일을 등록 할 수 있습니다.
          </div>
        )}
      </div>
    );
  }
}

Plupload.propTypes = {
  onPostInit: PropTypes.func,
  onBrowse: PropTypes.func,
  onRefresh: PropTypes.func,
  onStateChanged: PropTypes.func,
  onQueueChanged: PropTypes.func,
  onOptionChanged: PropTypes.func,
  onBeforeUpload: PropTypes.func,
  onUploadProgress: PropTypes.func,
  onFileFiltered: PropTypes.func,
  onFilesAdded: PropTypes.func,
  onFilesRemoved: PropTypes.func,
  onFileUploaded: PropTypes.func,
  onChunkUploaded: PropTypes.func,
  onUploadComplete: PropTypes.func,
  onDestroy: PropTypes.func,
  onError: PropTypes.func,
  id: PropTypes.string.isRequired,
  buttonSelect: PropTypes.string,
  buttonUpload: PropTypes.string,
  autoUpload: PropTypes.bool,
};

export default Plupload;
