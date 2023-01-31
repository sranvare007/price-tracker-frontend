import {
  Alert,
  Button,
  Card,
  CircularProgress,
  Snackbar,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useSelector } from "react-redux";
import { globalConstants } from "../constants/constants";
import { NetworkManager } from "../network/networkManager";
import { RootState } from "../types/reduxTypes";

export default function ProductDetails() {
  const productDetail = useSelector(
    (state: RootState) => state.productDetails.productDetail
  );
  const productUrl = useSelector(
    (state: RootState) => state.productUrl.productUrl
  );
  const [email, setEmail] = useState("");
  const [triggerPrice, setTriggerPrice] = useState(
    productDetail.productPrice.replace(/[^0-9]/g, "")
  );
  const [successSnackOpen, setSuccessSnackOpen] = useState(false);
  const [failureSnackOpen, setFailureSnackOpen] = useState(false);
  const [errorSnackMessage, setErrorSnackMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = () => {
    var validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!validRegex.test(email)) {
      return true;
    }
    return false;
  };

  const addProductPriceTracking = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    const response = await NetworkManager.addProductPriceTracking({
      productUrl: productUrl,
      triggerPrice: triggerPrice,
      emailId: email,
    });
    if (
      response != null &&
      response.status != null &&
      response.status == globalConstants.STATUS.SUCCESS
    ) {
      setSuccessSnackOpen(true);
    } else {
      setErrorSnackMessage(response.message as string);
      setFailureSnackOpen(true);
    }
    setIsLoading(false);
  };

  if (!productDetail) {
    return <p>No product url found</p>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexGrow: 1,
        marginTop: 2,
        padding: "10px 50px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          padding: "40px 50px",
        }}
        elevation={16}
      >
        <img
          src={productDetail.productImageUrl}
          style={{ height: 300, width: 300 }}
        />
        <Box
          sx={{
            flexDirection: "column",
            marginLeft: 16,
            marginTop: 4,
          }}
        >
          <p
            style={{ marginBottom: "10px", fontSize: "20px", fontWeight: 600 }}
          >
            {productDetail.productName}
          </p>
          <p style={{ marginBottom: "10px", fontSize: "14px" }}>
            {productDetail.productPrice}(
            <span
              style={{
                color:
                  Number(
                    productDetail.productDiscount.replace(/[^0-9-]/g, "") || 0
                  ) < 0
                    ? "red"
                    : "green",
                fontSize: "12px",
              }}
            >
              {productDetail.productDiscount || "0%"}
            </span>
            )
          </p>
          <p
            style={{
              textDecoration: "line-through",
              marginBottom: "10px",
              fontSize: "12px",
              color: "#565959",
            }}
          >
            {productDetail.productMrp}
          </p>

          <TextField
            id="outlined-basic"
            label="Enter your email"
            variant="outlined"
            style={{ width: "100%", marginBottom: "10px" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={email != "" && validateEmail()}
          />

          <TextField
            id="outlined-basic"
            type={"number"}
            label="Trigger Price"
            variant="outlined"
            style={{ width: "100%", marginBottom: "10px" }}
            value={triggerPrice}
            onChange={(e) => setTriggerPrice(e.target.value)}
          />

          <Button
            variant="contained"
            style={{
              width: "100%",
              marginTop: "10px",
            }}
            onClick={addProductPriceTracking}
          >
            {isLoading ? (
              <CircularProgress
                size={20}
                sx={{
                  color: "#fff",
                }}
              />
            ) : (
              "Create Alert"
            )}
          </Button>
        </Box>
      </Card>
      <Snackbar
        open={successSnackOpen}
        onClose={() => {
          setSuccessSnackOpen(false);
        }}
        autoHideDuration={3000}
      >
        <Alert severity="success" variant="filled">
          Added Product successfully to tracking list!
        </Alert>
      </Snackbar>
      <Snackbar
        open={failureSnackOpen}
        onClose={() => {
          setFailureSnackOpen(false);
        }}
        autoHideDuration={3000}
      >
        <Alert severity="error" variant="filled">
          Failed to add product to tracking list! {errorSnackMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
