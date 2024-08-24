import { itemData } from "../../../public/gallery";
import "./imageList.css";
import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function CustomImageList() {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleOpen = (img) => {
    setSelectedImage(img);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="image-list-container">
        <ImageList rowHeight={200} gap={14}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                {...srcset(item.img, 200, 200)}
                alt={item.title}
                loading="lazy"
                onClick={() => handleOpen(item.img)}
              />
              <ImageListItemBar
                sx={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                    "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                }}
                position="top"
                actionIcon={
                  <input className="custom-checkbox m-2" type="checkbox" />
                }
                actionPosition="left"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="image-popup-title"
        aria-describedby="image-popup-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            position: "relative",
            maxWidth: "90vw",
            maxHeight: "90vh",
            overflow: "hidden",
            backgroundColor: "black",
            borderRadius: "8px",
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: "white",
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
          <img
            src={selectedImage}
            alt="Popup"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
              cursor: "zoom-in",
            }}
            onClick={(e) =>
              (e.target.style.transform =
                e.target.style.transform === "scale(2)"
                  ? "scale(1)"
                  : "scale(2)")
            }
          />
        </Box>
      </Modal>
    </>
  );
}
