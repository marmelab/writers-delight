import { useEffect } from "react";
import { useListContext } from "react-admin";
import { useLocation } from "react-router-dom";
import debounce from "lodash/debounce";
import { highlightSearchTerm } from "highlight-search-term";

/**
 * Watch the current search term and highlight it in the list of compositions
 *
 * Uses the CSS Custom Highlight API (not supported on Firefox)
 * @see https://developer.mozilla.org/en-US/docs/Web/API/CSS_Custom_Highlight_API
 */
export const HighlightSearchTerm = () => {
  const { filterValues } = useListContext();
  const search = filterValues.q?.toLowerCase() || "";
  // the location pathname is used to trigger the user clicks on a composition
  const location = useLocation();

  useEffect(() => {
    debounceHighlightSearchTerm({
      search,
      selector: ".MuiList-root, [contenteditable=true]",
    });
  }, [location.pathname, search]);
  return null;
};

// debounce allows to delay the highlight, which allows the composition to render before the highlight
const debounceHighlightSearchTerm = debounce(highlightSearchTerm, 100);
