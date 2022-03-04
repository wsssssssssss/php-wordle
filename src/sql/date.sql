CREATE TABLE `wordle_tbl` (
  `wordle_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


INSERT INTO `wordle_tbl` (`wordle_date`) VALUES ('2022-03-04 05:56:24');
COMMIT;