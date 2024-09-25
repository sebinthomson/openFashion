import "./imageList.css";
import { useContext, useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";
import DetectedFaceApi from "../../api/detectedFace/DetectedFace";
import { DetailsContext } from "../../contexts/DetailsContext";

function srcset(image, size) {
  return {
    src: `${image}?w=${size}&h=${size}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size}&h=${size}&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function CustomImageList({
  selectedImagesIndex,
  setSelectedImagesIndex,
  detectedImages,
  setDetectedImages,
}) {
  const { phnNo } = useContext(DetailsContext);
  const theme = useTheme();

  const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  let cols;
  let height = "";
  if (isExtraSmallScreen) {
    cols = 2;
  } else if (isSmallScreen) {
    cols = 3;
  } else if (isMediumScreen) {
    cols = 4;
  } else if (isLargeScreen) {
    cols = 6;
    height = "auto";
  }

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleOpen = (img) => {
    setSelectedImage(img);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSelectImage = (i) => {
    setSelectedImagesIndex((prev) => {
      let imageUrl = detectedImages[i]?.image_url;
      let newSelectedImages = [...prev];
      const indexOfI = newSelectedImages.indexOf(imageUrl);
      if (indexOfI !== -1) {
        newSelectedImages.splice(indexOfI, 1);
      } else {
        newSelectedImages.push(imageUrl);
      }
      return newSelectedImages;
    });
  };

  const fetchImages = async () => {
    // const res = await DetectedFaceApi("8089543963");
    const res = await DetectedFaceApi(phnNo);
    setDetectedImages(res);
  };
  useEffect(() => {
    fetchImages();
  }, []);
  return (
    <>
      <div className="image-list-container" style={{ height: height }}>
        <ImageList rowHeight={200} gap={14} cols={cols}>
          {Array.isArray(detectedImages) &&
            detectedImages.map((item, i) => {
              return (
                <ImageListItem key={item.image_url}>
                  <img
                    {...srcset(item.image_url, 200)}
                    alt={item.title}
                    loading="lazy"
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                    onClick={() => handleOpen(item.image_url)}
                  />
                  <ImageListItemBar
                    sx={{
                      background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                        "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                    }}
                    position="top"
                    actionIcon={
                      <input
                        className="custom-checkbox m-2"
                        type="checkbox"
                        onChange={() => {
                          handleSelectImage(i);
                        }}
                      />
                    }
                    actionPosition="left"
                  />
                </ImageListItem>
              );
            })}
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
