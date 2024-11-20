if (!require("jsonlite")) {
  install.packages("jsonlite")
}

library(jsonlite)

input_file <- "resultats.json"
output_file <- "resultats.RData"

data <- fromJSON(input_file, flatten = TRUE)

if (require("dplyr")) {
  library(dplyr)
  data <- as_tibble(data)
}

save(data, file = output_file)

cat("Les dades s'han desat a:", output_file, "\n")