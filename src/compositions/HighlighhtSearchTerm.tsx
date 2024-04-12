import { useEffect } from "react";
import { useListContext } from "react-admin";
import { useLocation } from "react-router-dom";
import debounce from "lodash/debounce";

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
    if (!CSS.highlights) return; // disable feature on Firefox as it does not support CSS Custom Highlight API
    CSS.highlights.clear();
    if (!search) return;
    highlightSearchTerm(
      search,
      ".MuiListItemText-primary>div, .MuiListItemText-secondary, [contenteditable=true]"
    );
  }, [location.pathname, search]);
  return null;
};

// debounce allows to delay the highlight, which allows the composition to render before the highlight
const highlightSearchTerm = debounce((search: string, selector: string) => {
  const ranges: Range[] = [];
  const elements = document.querySelectorAll(selector);
  Array.from(elements).forEach((element) => {
    ranges.push(...getRangesForSearchTermInElement(element as Element, search));
  });
  if (ranges.length === 0) return;
  const highlight = new Highlight(...ranges); // eslint-disable-line no-undef
  // create a CSS highlight that can be styled with the ::highlight(search) pseudo-element
  CSS.highlights.set("search", highlight);
}, 100);

const getRangesForSearchTermInElement = (element: Element, search: string) => {
  const ranges: Range[] = [];
  if (!element.firstChild) return ranges;
  const text = element.textContent?.toLowerCase() || "";
  let start = 0;
  let index;
  while ((index = text.indexOf(search, start)) >= 0) {
    const range = new Range();
    range.setStart(element.firstChild, index);
    range.setEnd(element.firstChild, index + search.length);
    ranges.push(range);
    start = index + search.length;
  }
  return ranges;
};
