import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { postData ,getData} from "../../FetchNodeServices";
import kookyLogo from "../../../images/logo.png";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';import CircularProgress from "@material-ui/core/CircularProgress";
import Slide from "@material-ui/core/Slide";

export default class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: [],
      open: false,
      result: "Photo Uploaded Successfully",
      lstyle: { display: "none" },
      button: "Browse Photos",
      numOfImagesByEscort:"",
    };
  }

  uploadMultipleFiles = (e) => {
    this.setState({ lstyle: { display: "block" }, button: "" });
    let files = e.target.files;
    let reader = new FileReader();
    try {
      reader.readAsDataURL(files[0]);

      reader.onload = (e) => {
        const newfiles =
          this.state.file.length < this.state.numOfImagesByEscort
            ? [...this.state.file, e.target.result]
            : [...this.state.file];
        console.log("file: ", newfiles);
       this.uploadFiles(e,newfiles);
     
        this.setState({
          file: newfiles,
        });
      };
    } catch {
      this.setState({
       
        lstyle: { display: "none" },
        button:"Browse Photos",
      });
      return;
    }
  };

  uploadFiles = async (e,newfiles) => {
    e.preventDefault();
    console.log("files: ", newfiles);
    const body = {
      image: newfiles,
      id: this.props.userId,
      username: this.props.username,
    };
    const result = await postData("escort/upload-images", body);
    if (!result.response) {
      // this.props.handleEscortImageUploads(result.data);
      setTimeout(() =>{
      this.setState({
        open: true,
        lstyle: { display: "none" },
        button:"Browse Photos",
      });
    },3000);
      console.log("Uploaded: ", result);
    } else {
      console.log("Err: ", result.response);
    }
  };

  componentDidMount=async()=> {
    var check = await getData("admin/get-all-options");
    console.log("check",check);
    this.setState({
      numOfImagesByEscort:check.data.data.numOfImagesByEscort,
    })
    this.props.handleUpdateProfile();
    this.setState({ file: this.props.images || [] });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.images !== this.props.images) {
      this.setState({ file: this.props.images || [] });
    }
  }

  handleClose = async () => {
    this.setState({
      open: false,
      lstyle: { display: "none" },
      button: "Browse Photos",
    });
  };
  removeClick = async (idx) => {
    console.log("Removed clicked: ", idx);
    let newArray = [...this.state.file];
    const removedUrl = newArray.splice(idx, 1);
    this.setState({ file: newArray });
    const body = {
      id: this.props.userId,
      url: removedUrl[0],
    };
    const result = await postData("escort/delete-images/", body);
    if (!result.response) {
      console.log("result: ", result);
      // this.props.handleEscortImageDelete(result.data);
      this.setState({
        open: true,
        result: "Photo revomed successfully",
        lstyle: { display: "none" },
        button: "Browse Photos",
      });
    } else {
      console.log("err: ", result.response);
    }
  };
  render() {
    const Transition = React.forwardRef(function Transition(props, ref) {
      return <Slide direction="up" ref={ref} {...props} />;
    });
    return (
      <>
        <div className="edit-profilebox">
           <form>
            <div className="uploadimgae-title">
              <h3>
                Upload upto {this.state.numOfImagesByEscort} Photos{" "}
                <span>({this.state.file.length} Photos)</span>
              </h3>
            </div>

            <div className="form-group multi-preview">
              {this.state.file.map((url, idx) => (
                <div className="uploadimg-arry" key={idx}>
                  <span
                    className="fa fa-close"
                    onClick={() => this.removeClick(idx)}
                  ></span>
                  <img src={url} alt="..." />
                </div>
              ))}
              
            </div>
            <Snackbar open={this.state.open} style={{position: 'relative',width:350,marginTop:30}} onClose={()=>this.handleClose()}>
        <MuiAlert onClose={()=>this.handleClose()} severity="success">
          {this.state.result}
        </MuiAlert>
</Snackbar>

            {this.state.file.length < this.state.numOfImagesByEscort ? (
              <div className="form-group">
                <Form.Label>Upload Photos</Form.Label>
                <div className="uploadimgrdiv">
                  <div className="dsd">
                    <div className="uploadboxnew">
                      <i className="flaticon-cloud-computing"></i>
                      <h4>Drag and drop files</h4>
                      <span>Or</span>
                      <button> {this.state.button}   <CircularProgress style={this.state.lstyle} color="white" /> </button>
                      <input
                        type="file"
                        className="form-control"
                        onChange={this.uploadMultipleFiles}
                        accept="image/*"
                        multiple
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            {/* <Form.Group className="text-right">
              <Button
                type="submit"
                className="uppercase"
                onClick={this.uploadFiles}
              >
                {this.state.button}{" "}
              
              </Button>
            </Form.Group> */}
          </form>
        </div>
      </>
    );
  }
}
