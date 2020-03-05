import React from "react";
import { TweenMax, Power2, Linear, TimelineLite, TimelineMax } from "gsap";
import Slot from "../containers/Slot";
import { getSlotItemType } from "../features/StoredBar/stored_buttons";

class TypeFocus extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      barType: props.barType
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // Trigger Initial TypeFocus Animation Sequence
    showTypeFocus();
  }

  handleClick(e) {
    e.stopPropagation();
    // console.log('Type Focus Click');
  }

  render() {
    const focus = this.props.focus,
      items = this.props.items;

    const sorted = sort(items);
    const left =
      focus === "left1" ||
      focus === "left2" ||
      focus === "left3" ||
      focus === "left4" ||
      focus === "left5" ||
      focus === "left6" ||
      focus === "left7" ||
      focus === "left8";

    const slots = buildBucket(9, sorted[1]);
    const headerText = getSlotItemType(focus, "type");
    const typeFocusClass = left ? "type_focus left" : "type_focus right";
    const typeHeaderClass = left
      ? "type_focus_header left"
      : "type_focus_header right";

    return (
      <div className="type_focus_bar">
        <div className={typeFocusClass}>
          <div className={typeHeaderClass}>
            <h5 className={left ? "header_left" : "header_right"}>
              {headerText}
            </h5>
          </div>
          {left ? (
            <Slot
              id="focus_target"
              item={sorted[0]}
              slotType={"slot focus left"}
              side={"none"}
              pos={-1}
              onClick={e => this.handleClick(e)}
            ></Slot>
          ) : null}
          <div className={left ? "bucket left" : "bucket right"}>{slots}</div>
          {!left ? (
            <Slot
              id="focus_target"
              item={sorted[0]}
              slotType={"slot focus right"}
              side={"none"}
              pos={-1}
              onClick={e => this.handleClick(e)}
            ></Slot>
          ) : null}
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
        slotType={"bucket_slot"}
        item={items[i]}
        side={"focus"}
        pos={i}
        key={i}
      />
    );
  }

  return slots;
}

function sort(items) {
  let eqp;
  let bucket = [];

  for (let i = 0; i < items.length; i++) {
    if (!items[i].isEquipped) {
      bucket.push(items[i]);
    } else {
      eqp = items[i];
    }
  }

  return [eqp, bucket];
}

// Animations

function showTypeFocus() {
  const header = document.querySelector(".type_focus_header");
  const bucket = document.querySelector(".bucket");

  let timeline = new TimelineMax();

  timeline.to(bucket, 0, { css: { scale: 0 } }, 0 );
  timeline.to(header, 0, { css: { scaleX: 0 } }, 0 );
  timeline.to(header, 0.5, { css: { scaleX: 1 }, ease: Power2.easeInOut }, 0);
  timeline.to(bucket, 0.5, { css: { scale: 1 }, ease: Power2.easeInOut }, 0);
}

export default TypeFocus;
