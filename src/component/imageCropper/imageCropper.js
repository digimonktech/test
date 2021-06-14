import React, { PureComponent } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "./imageCropper.styles.css";

class ImageCropper extends PureComponent {
  state = {
    src: null,
    crop: {
      unit: "%",
      width: 255,
      aspect: 9 / 9,
    },
  };
  componentDidMount() {
    // this.setState({ src: this.props.img });
    this.setState({ crop: this.props.crop });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.img !== this.props.img) {
      // this.setState({ src: this.props.img });
    }
  }

  onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // If you setState the crop in here you should return false.
  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropComplete = (crop) => {
    this.makeClientCrop(crop);
  };

  onCropChange = (crop, percentCrop) => {
    // You could also use percentCrop:
    // this.setState({ crop: percentCrop });
    this.setState({ crop });
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageUrl });
      this.props.getCroppedImage(croppedImageUrl);
    }
  }

  getCroppedImg(image, crop, fileName) {
    console.log(crop);
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error("Canvas is empty");
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        resolve(this.fileUrl);
      }, "image/jpeg");
    });
  }

  render() {
    const { crop, croppedImageUrl, src } = this.state;
    return (
      <div className="App">
        <div style={{ marginBottom: "2vh" }}>
          <input type="file" accept="image/*" onChange={this.onSelectFile} />
        </div>
        <div className="ReactCropperImage">
          {src && (
            <ReactCrop
              src={src}
              crop={crop}
              ruleOfThirds
              onImageLoaded={this.onImageLoaded}
              onComplete={this.onCropComplete}
              onChange={this.onCropChange}
              // style={{ height: "10rem" }}
              height="100"
              locked
            />
          )}
          <div style={{ marginTop: "12vh" }}>
            {croppedImageUrl && (
              <img
                alt="Crop"
                style={{ maxHeight: "20rem" }}
                src={croppedImageUrl}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ImageCropper;
