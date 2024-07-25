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
} from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

export function PaginatedList({ items, renderItem }) {
  const [pageNumber, setPageNumber] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(3);

  const totalPages = Math.ceil((items?.length || 0) / resultsPerPage);

  const itemsToRender = items.slice((pageNumber - 1) * resultsPerPage, pageNumber * resultsPerPage);

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
              setPageNumber(1);
            }}
          >
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      {
        itemsToRender.map((item) => renderItem(item))
      }
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
