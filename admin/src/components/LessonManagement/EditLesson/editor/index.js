import React, { Component } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
// #1 import quill-image-uploader
import ImageUploader from 'quill-image-uploader';
import ImageResize from 'quill-image-resize-module-react';
// #2 register module
Quill.register('modules/imageUploader', ImageUploader);
Quill.register('modules/imageResize', ImageResize);
class QuillEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    if (this.props.editData) {
      this.state[this.props.fieldName] = this.props.editData;
    } else this.state[this.props.fieldName] = '';
    console.log(this.props.editdata);
  }

  modules = {
    // #3 Add "image" to the toolbar
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      [{ align: [] }],
      ['link', 'image'],
      ['clean'],
      [
        {
          color: [
            '#000000',
            '#e60000',
            '#ff9900',
            '#ffff00',
            '#008a00',
            '#0066cc',
            '#9933ff',
            '#ffffff',
            '#facccc',
            '#ffebcc',
            '#ffffcc',
            '#cce8cc',
            '#cce0f5',
            '#ebd6ff',
            '#bbbbbb',
            '#f06666',
            '#ffc266',
            '#ffff66',
            '#66b966',
            '#66a3e0',
            '#c285ff',
            '#888888',
            '#a10000',
            '#b26b00',
            '#b2b200',
            '#006100',
            '#0047b2',
            '#6b24b2',
            '#444444',
            '#5c0000',
            '#663d00',
            '#666600',
            '#003700',
            '#002966',
            '#3d1466',
            'custom-color',
          ],
        },
      ],
    ],
    // # 4 Add module and upload function
    imageUploader: {
      upload: async (file) => {
        const bodyFormData = new FormData();
        bodyFormData.append('file', file);
        bodyFormData.append('upload_preset', 'viesoftware');
        const response = await axios({
          method: 'post',
          url: 'https://api.cloudinary.com/v1_1/dnrxsjo5r/image/upload',
          data: bodyFormData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return response.data.secure_url;
      },
    },
    imageResize: {
      parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize'],
    },
  };

  formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'color',
    'imageBlot',
    'align', // #5 Optinal if using custom formats
  ];

  render() {
    // console.log(this.state.text);
    return (
      <ReactQuill
        theme="snow"
        style={{ height: '80vh' }}
        modules={this.modules}
        formats={this.formats}
        value={this.state[this.props.fieldName] || ''}
        onChange={(content) => {
          this.state[this.props.fieldName] = content;
          this.props.setdata(this.state);
        }}
      />
    );
  }
}

export default QuillEditor;
