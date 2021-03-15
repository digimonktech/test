import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";

export default class UploadImage extends Component {
  fileObj = [];
  fileArray = [];
  constructor(props) {
    super(props);
    this.state = {
      file: [null],
    };
    this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
  }

  uploadMultipleFiles(e) {
    this.fileObj.push(e.target.files);
    for (let i = 0; i < this.fileObj[0].length; i++) {
      this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]));
    }
    this.setState({ file: this.fileArray });
  }

  uploadFiles(e) {
    e.preventDefault();
    console.log(this.state.file);
  }
  render() {
    return (
      <>
        <div className="edit-profilebox">
          <form>
            <div className="uploadimgae-title">
              <h3>
                Upload Images <span>(5 images)</span>
              </h3>
            </div>

            <div className="form-group multi-preview">
              {(this.fileArray || []).map((url) => (
                <div className="uploadimg-arry">
                  <span className="fa fa-close"></span>
                  <img src={url} alt="..." />
                </div>
              ))}
            </div>

            <div className="form-group">
              <Form.Label>Upload image</Form.Label>
              <div className="uploadimgrdiv">
                <div className="dsd">
                  <div className="uploadboxnew">
                    <i className="flaticon-cloud-computing"></i>
                    <h4>Drag and drop files</h4>
                    <span>Or</span>
                    <button>Browse files</button>
                    <input
                      type="file"
                      className="form-control"
                      onChange={this.uploadMultipleFiles}
                      multiple
                    />
                  </div>
                </div>
              </div>
            </div>
            <Form.Group className="text-right">
              <Button type="submit" className="uppercase">
                Save
              </Button>
            </Form.Group>
          </form>
        </div>
      </>
    );
  }
}
