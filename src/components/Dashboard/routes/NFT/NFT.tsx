import React from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";

import { LeftArrow, RightArrow } from "./arrows";
import { Card } from "./card";
import { Header } from "./header";
import "./NFT.scss";

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const elemPrefix = "test";
const getId = (index: number) => `${elemPrefix}${index}`;

const getItems = () =>
  Array(20)
    .fill(0)
    .map((_, ind) => ({ id: getId(ind) }));

function NFT() {
  const [items] = React.useState(getItems);
  const [selected, setSelected] = React.useState<string[]>([]);
  // can save and restore position if needed
  const [position, setPosition] = React.useState(100);

  const isItemSelected = (id: string): boolean => !!selected.find((el) => el === id);

  const handleItemClick =
    (itemId: string) =>
    ({ getItemById }: scrollVisibilityApiType) => {
      const itemSelected = isItemSelected(itemId);

      console.log(getItemById(itemId));

      setSelected((currentSelected: string[]) =>
        itemSelected
          ? currentSelected.filter((el) => el !== itemId)
          : currentSelected.concat(itemId),
      );
    };

  const restorePosition = React.useCallback(
    ({ scrollContainer }: scrollVisibilityApiType) => {
      if (scrollContainer.current) {
        scrollContainer.current.scrollLeft = position;
      }
    },
    [position],
  );

  const savePosition = React.useCallback(
    ({ scrollContainer }: scrollVisibilityApiType) =>
      !!scrollContainer.current && setPosition(scrollContainer.current.scrollLeft),
    [],
  );

  return (
    <>
      <Header />
      <div className="example" style={{ paddingTop: "0px" }}>
        <div>
          <ScrollMenu
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            onInit={restorePosition}
            onScroll={savePosition}
            onWheel={onWheel}
          >
            {items.map(({ id }) => (
              <Card
                key="1"
                title="ArGo"
                itemId={id} // NOTE: itemId is required for track items
                onClick={handleItemClick(id)}
                selected={isItemSelected(id)}
              />
            ))}
          </ScrollMenu>
        </div>
      </div>
    </>
  );
}
export default NFT;

function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}
