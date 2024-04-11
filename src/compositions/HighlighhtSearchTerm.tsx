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
    if (!CSS.highlights) return;
    CSS.highlights.clear();
    if (!search) return;
    highlightSearchTerm(search);
  }, [location.pathname, search]);
  return null;
};

// debounce allows to delay the highlight, which allows the composition to render before the highlight
const highlightSearchTerm = debounce((search: string) => {
  const ranges: Range[] = [];
  // highlight term in list of compositions
  const list = document.querySelector(".MuiList-root");
  if (list) {
    list.querySelectorAll(".MuiListItemText-root").forEach((item) => {
      // highlight term in primary text
      const primary = item.querySelector(".MuiListItemText-primary");
      if (primary && primary.firstChild && primary.firstChild.firstChild) {
        ranges.push(
          ...getRangesForSearchTermInElement(
            primary.firstChild as Element,
            search
          )
        );
      }
      // highlight term in secondary text
      const secondary = item.querySelector(".MuiListItemText-secondary");
      if (secondary && secondary.firstChild) {
        ranges.push(...getRangesForSearchTermInElement(secondary, search));
      }
    });
  }
  // highlight term in PredictiveTextInput
  const contentEditable = document.querySelector("[contenteditable=true]");
  if (contentEditable && contentEditable.firstChild) {
    ranges.push(...getRangesForSearchTermInElement(contentEditable, search));
  }

  if (ranges.length === 0) return;

  // eslint-disable-next-line no-undef
  const highlight = new Highlight(...ranges);
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
