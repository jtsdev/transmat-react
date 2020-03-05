import React from "react";
import Slot from "../../containers/Slot";
import { TweenMax, Power2, Linear, TimelineLite, TimelineMax } from "gsap";

class StoredFocus extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.stopPropagation();
  }

  render() {
    const focSlot = this.props.subtype,
      subtypeTitle = this.props.storedFocus;

    const isArmor =
        focSlot === "right1" ||
        focSlot === "right2" ||
        focSlot === "right3" ||
        focSlot === "right4" ||
        focSlot === "right5",
      subItems = isArmor
        ? getItemsByClass(this.props.storedFocus, this.props.items)
        : getItemsBySubtype(this.props.storedFocus, this.props.items),
      itemCount = subItems.length;
    // const slotCount = round5( itemCount );
    const slotCount = 20;
    const slots = buildBucket(slotCount, subItems);

    return (
      <div className="stored_focus_bar">
        <div className="stored_focus">
          <div className="stored_focus_header">
            <h5 className={"header_top " + subtypeTitle}>{subtypeTitle}</h5>
          </div>
          <div className={"stored_bucket"}>{slots}</div>
        </div>
      </div>
    );
  }
}

// Helpers

function buildBucket(slotCount, items) {
  let slots = [];

  for (let i = 0; i < slotCount; i++) {
    slots.push(
      <Slot
        slotType={"stored_bucket_slot"}
        item={items[i]}
        side={"bottom"}
        pos={i + 1}
        key={i}
      />
    );
  }

  return slots;
}

function getItemsBySubtype(subtype, items) {
  let subItems = [];

  const str = subtype.slice(0, -1);

  for (let i = 0; i < items.length; i++) {
    if (items[i].itemTypeDisplayName === str) {
      subItems.push(items[i]);
    }
  }

  return subItems;
}

function getItemsByClass(subtype, items) {
  const classIndex = getClassIndex(subtype);

  let itemsByClass = [];

  for (let i = 0; i < items.length; i++) {
    if (items[i].classType === classIndex) {
      itemsByClass.push(items[i]);
    }
  }

  return itemsByClass;
}

function getClassIndex(className) {
  switch (className) {
    case "Titan":
      return 0;
    case "Hunter":
      return 1;
    case "Warlock":
      return 2;
  }
}

function round5(x) {
  return Math.ceil(x / 5) * 5;
}

// Animations

function launchStoredFocus() {
  const storedFocus = document.querySelector(".stored_focus");

  TweenMax.to(storedFocus, 0.25, { css: { scaleY: 1 }, ease: Power2.easeOut });
}

export default StoredFocus;
