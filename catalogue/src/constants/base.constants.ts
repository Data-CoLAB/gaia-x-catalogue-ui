import { STREAMLIT_PATH, VITE_BASE_PATH, WIZARD_URL } from "@catalogue/utility/constant";

export enum Environment {
  local = 'http://localhost:4000',
}

export enum APIStatus {
  Pending = 0,
  InProgress = 1,
  Success = 2,
  Failure = 3,
}

export enum SearchType {
  Selector = 0,
  Advanced = 1,
}

export const navigationItems = [
  {
    to: VITE_BASE_PATH,
    label: 'Catalogue',
  },
  {
    to: WIZARD_URL,
    label: 'Create Services',
    external: true,
  },
  {
    to: STREAMLIT_PATH,
    label: 'Streamlit',
  },
]
