import {
  Alert,
  Button,
  Card,
  CircularProgress,
  Snackbar,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { globalConstants } from "../constants/constants";
import { setProductDetail } from "../features/productDetails";
import { setProductUrlState } from "../features/productUrl";
import { NetworkManager } from "../network/networkManager";

export default function Main() {
  const [productUrl, setProductUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getProductDetails = async () => {
    setIsLoading(true);
    const response = await NetworkManager.vaidateProductUrl({
      productUrl,
    });
    setIsLoading(false);
    if (
      response != null &&
      response.status != null &&
      response.status == globalConstants.STATUS.SUCCESS
    ) {
      dispatch(setProductDetail(response.message));
      dispatch(setProductUrlState(productUrl));
      navigate("/product-details");
    } else {
      setOpen(true);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        variant="elevation"
        elevation={4}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "40%",
          padding: "60px 40px",
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <TextField
              id="outlined-basic"
              label="Product Url"
              variant="outlined"
              style={{ width: "100%" }}
              value={productUrl}
              onChange={(e) => setProductUrl(e.target.value)}
            />
            <Button
              variant="contained"
              style={{ width: "30%", margin: "70px 0px 0px 0px" }}
              onClick={getProductDetails}
            >
              Submit
            </Button>
          </>
        )}
      </Card>
      <Snackbar
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        autoHideDuration={3000}
        message="Failed to get product details!"
      >
        <Alert severity="error" variant="filled">
          Error getting product details. Please check the URL!
        </Alert>
      </Snackbar>
    </Box>
  );
}
