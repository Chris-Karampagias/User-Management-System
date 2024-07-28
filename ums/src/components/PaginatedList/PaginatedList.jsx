/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  IconButton,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import {
  ArrowBack,
  ArrowForward,
  ContentPasteGoRounded,
} from "@mui/icons-material";

const calculatePageNumberSegments = (totalPages, pageNumber) => {
  const pageNumberContent = Array.from({ length: totalPages }, (_, i) => i + 1);

  let pagesBeforeCurrentPage = [];
  let pagesAfterCurrentPage = [];

  if (totalPages >= 5) {
    if (pageNumber >= totalPages - 3) {
      pagesBeforeCurrentPage = [1, "..."];
      pagesAfterCurrentPage = [
        ...pageNumberContent.slice(pageNumber - 1, totalPages),
      ];

      if (pageNumber - 1 < totalPages - 4) {
        pagesAfterCurrentPage = [
          ...pageNumberContent.slice(pageNumber, totalPages - 3),
        ];
      }
    } else {
      pagesBeforeCurrentPage = pageNumberContent.slice(0, pageNumber + 1);
      if (pageNumber + 1 > 4) {
        pagesBeforeCurrentPage = [
          1,
          "...",
          ...pageNumberContent.slice(pageNumber - 3, pageNumber),
        ];
      }
      pagesAfterCurrentPage = ["...", totalPages];
    }
  }
  return { pageNumberContent, pagesBeforeCurrentPage, pagesAfterCurrentPage };
};

export function PaginatedList({ items, renderItem }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [resultsPerPage, setResultsPerPage] = useState(3);

  const totalPages = Math.ceil((items?.length || 0) / resultsPerPage);

  const itemsToRender = items.slice(
    (pageNumber - 1) * resultsPerPage,
    pageNumber * resultsPerPage
  );

  const { pageNumberContent, pagesBeforeCurrentPage, pagesAfterCurrentPage } =
    calculatePageNumberSegments(totalPages, pageNumber);

  return (
    <Stack direction="column" gap={3}>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" gap={1} alignItems="center">
          <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Go To Page
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="number"
              inputProps={{
                min: 1,
                max: totalPages,
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (inputValue > totalPages || inputValue < 0) {
                    return;
                  }
                  setPageNumber(inputValue);
                  setInputValue("");
                }
              }}
              value={inputValue}
              onChange={(e) => setInputValue(parseInt(e.target.value))}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={() => {
                      if (inputValue > totalPages || inputValue < 0) {
                        return;
                      }
                      setPageNumber(inputValue);
                      setInputValue("");
                    }}
                  >
                    <ContentPasteGoRounded />
                  </IconButton>
                </InputAdornment>
              }
              label="Go To Page"
            />
          </FormControl>
        </Stack>
        <FormControl sx={{ m: 1, minWidth: 170 }}>
          <InputLabel>Results per page</InputLabel>
          <Select
            label="Results per page"
            defaultValue={resultsPerPage}
            onChange={(e) => {
              setResultsPerPage(e.target.value);
              setPageNumber(1);
              setInputValue("");
            }}
          >
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      {itemsToRender.map((item) => renderItem(item))}
      <Stack
        direction="row"
        gap={1}
        alignItems="center"
        justifyContent="center"
      >
        <IconButton
          onClick={() => setPageNumber((prevNumber) => prevNumber - 1)}
          disabled={pageNumber === 1}
        >
          <ArrowBack />
        </IconButton>
        <Stack direction="row">
          {totalPages < 6 && (
            <>
              {pageNumberContent.map((pageNumberContent) => (
                <Button
                  onClick={() => setPageNumber(pageNumberContent)}
                  disabled={pageNumber === pageNumberContent}
                  key={pageNumberContent}
                  sx={{
                    "&.Mui-disabled": {
                      color: "primary.main",
                      fontSize: 25,
                      fontWeight: "bold",
                    },
                  }}
                >
                  {pageNumberContent}
                </Button>
              ))}
            </>
          )}

          {totalPages >= 6 && (
            <>
              {pagesBeforeCurrentPage.map((pageNumberContent) => {
                if (!Number.isInteger(pageNumberContent)) {
                  return (
                    <Typography key={pageNumberContent} alignSelf="center">
                      {pageNumberContent}
                    </Typography>
                  );
                }
                return (
                  <Button
                    onClick={() => setPageNumber(pageNumberContent)}
                    disabled={pageNumber === pageNumberContent}
                    key={pageNumberContent}
                    size={pageNumber === pageNumberContent ? "large" : "small"}
                    sx={{
                      "&.Mui-disabled": {
                        color: "primary.main",
                        fontSize: 25,
                        fontWeight: "bold",
                      },
                    }}
                  >
                    {pageNumberContent}
                  </Button>
                );
              })}
              {pagesAfterCurrentPage.map((pageNumberContent) => {
                if (!Number.isInteger(pageNumberContent)) {
                  return (
                    <Typography key={pageNumberContent} alignSelf="center">
                      {pageNumberContent}
                    </Typography>
                  );
                }
                return (
                  <Button
                    onClick={() => setPageNumber(pageNumberContent)}
                    disabled={pageNumber === pageNumberContent}
                    key={pageNumberContent}
                    sx={{
                      "&.Mui-disabled": {
                        color: "primary.main",
                        fontSize: 25,
                        fontWeight: "bold",
                      },
                    }}
                  >
                    {pageNumberContent}
                  </Button>
                );
              })}
            </>
          )}
        </Stack>
        <IconButton
          onClick={() => setPageNumber((prevNumber) => prevNumber + 1)}
          disabled={pageNumber === totalPages}
        >
          <ArrowForward />
        </IconButton>
      </Stack>
    </Stack>
  );
}
