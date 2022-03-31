import React from 'react';
import { CKEditor } from 'ckeditor4-react';
import parser from 'html-react-parser';
class Ckeditor4 extends React.Component {
  constructor(props) {
    super(props);
    props.data
      ? (this.state = {
          data: props.data,
        })
      : (this.state = {
          data: '',
        });

    CKEditor.editorUrl =
      'https://cdn.ckeditor.com/4.16.0/standard-all/ckeditor.js';
  }

  onEditorChange = (e) => {
    this.setState({
      data: e.editor.getData(),
    });
    this.props.setdata(e.editor.getData());
  };
  // componentDidMount() {
  //   if (this.props.data) {
  //     this.setState({
  //       data: this.props.data,
  //     });
  //   }
  // }
  render() {
    return (
      <div className="Ckeditor4">
        <CKEditor
          initData={parser(this.state.data)}
          data={parser(this.state.data)}
          onChange={this.onEditorChange}
          config={{
            extraPlugins: 'ckeditor_wiris',
            removePlugins:
              'filetools,uploadimage,uploadwidget,uploadfile,filebrowser,easyimage',
            allowedContent: true,
          }}
          onBeforeLoad={(CKEDITOR) => {
            CKEDITOR.plugins.addExternal(
              'ckeditor_wiris',
              '/mathtype-ckeditor4/',
              'plugin.js'
            );
          }}
        />
      </div>
    );
  }
}

export default Ckeditor4;
