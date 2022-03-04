CREATE TABLE `wordle_tbl` (
  `word`        varchar(10) NOT NULL,
  `wordle_date` timestamp   NOT NULL DEFAULT current_timestamp(),
  `time`        varchar(10)
)
