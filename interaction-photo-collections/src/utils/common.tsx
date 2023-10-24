import { createApi } from "unsplash-js";

export const CLIENT_ID = "k4mKUfSFl2sc60DA18XI5fnXlZw0LwFqSi8W9SATfAc";
export const unsplash = createApi({ accessKey: `${CLIENT_ID}` });