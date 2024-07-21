/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  IconButton,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { calculateTotalPages } from "./utilities";
import { ResultsPage } from "../../components";

const getPages = (users, totalPages, resultsPerPage) => {
  const pagesMapping = {};

  let i = 1;
  let start = 0;
  let end = resultsPerPage;

  while (i <= totalPages) {
    if (end > users.length) {
      end = users.length;
    }
    const results = users.slice(start, end);
    pagesMapping[i] = <ResultsPage users={results} />;
    start = end;
    end += resultsPerPage;
    i += 1;
  }

  return pagesMapping;
};

export function Pagination({ users }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(3);

  const totalPages = calculateTotalPages(users, resultsPerPage);
  const pagesMapping = getPages(users, totalPages, resultsPerPage);

  useEffect(() => {
    if (pageNumber > totalPages && totalPages > 0) {
      setPageNumber(totalPages);
    }
  }, [pageNumber, totalPages]);

  return (
    <Stack direction="column" gap={3}>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" gap={1} alignItems="center">
          <IconButton
            onClick={() => setPageNumber((prevNumber) => prevNumber - 1)}
            disabled={pageNumber === 1}
          >
            <ArrowBack />
          </IconButton>
          <Typography>
            {pageNumber} / {totalPages}
          </Typography>
          <IconButton
            onClick={() => setPageNumber((prevNumber) => prevNumber + 1)}
            disabled={pageNumber === totalPages}
          >
            <ArrowForward />
          </IconButton>
        </Stack>
        <FormControl sx={{ m: 1, minWidth: 170 }}>
          <InputLabel>Results per page</InputLabel>
          <Select
            label="Results per page"
            defaultValue={resultsPerPage}
            onChange={(e) => {
              setResultsPerPage(e.target.value);
            }}
          >
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      {pagesMapping[pageNumber]}
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
        <Typography>
          {pageNumber} / {totalPages}
        </Typography>
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
