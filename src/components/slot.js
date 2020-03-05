import React from "react";
import { TweenMax, Power2, Linear, TimelineMax } from "gsap";
import { settings } from "../index";
import { resetButtons } from "../features/StoredBar/stored_buttons";

class Slot_Comp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const info = this.props.moveInfo ? this.props.moveInfo : null;

    if (info) {

      const scanSlot = document.querySelector(".item_details");

      scanSlot.style.left = info.start[0] + "px";
      scanSlot.style.top = info.start[1] + "px";
      scanSlot.style.width = info.dims + "px";
      scanSlot.style.height = info.dims + "px";

      let ghost = document.querySelector(".ghost");
      let rings = document.querySelector(".rings");

      ghost.classList.remove("left");
      ghost.classList.remove("right");
      ghost.classList.remove("bottom");
      rings.classList.remove("left");
      rings.classList.remove("right");
      rings.classList.remove("bottom");
      ghost.classList.add("actions");

      bottomSlotDetailsSetup(
        this.props.scannerTarget,
        this.props.onShowDetails
      );
    }
  }

  handleClick(e) {

    e.stopPropagation();

    let index = this.props.side + this.props.pos;
    let slotType = this.props.slotType;
    let itemClick = this.props.onItemClick;

    // Catch 'Switcher'
    if (index === "left5" || index === "left9") {
      switcherAnimation(this.props.onSwitcherClick, index);
    }

    // Catch 'Scanner'
    else if (slotType === "slot item_details") {
      // console.log( 'Item Details Clicked' );
    }

    // Catch classed slots
    else if (
      slotType === "bucket_slot" ||
      slotType === "slot focus left" ||
      slotType === "slot focus right" ||
      slotType === "postmaster_slot"
    ) {
      const focusItem = this.props.item;

      if (focusItem) {
        if (document.querySelector(".shrunk")) {
          removeStoredPriority(itemDetailsSetup, [
            index,
            focusItem,
            itemClick,
            this.props.onShowDetails
          ]);
        } else {
          itemDetailsSetup(
            index,
            focusItem,
            itemClick,
            this.props.onShowDetails
          );
        }
      }
    } else if (
      slotType === "stored_bucket_slot" ||
      slotType === "inv_bucket_slot" ||
      slotType === "vault_bucket_slot"
    ) {
      const focusItem = this.props.item;

      if (focusItem) {
        itemClick(index, focusItem);
      }
    }

    // Catch subclass focus slots
    else if (
      index === "subFocus0" ||
      index === "unfoc0" ||
      index === "unfoc1"
    ) {
      //this.props.unfocusedSubclassClick(this.props.item);
      // console.log('Subclass Click');
    }

    // Regular slot or subclass slot
    else {
      slotType === "slot"
        ? focusSetup(this.props.side, this.props.pos, this.props.onSlotClick)
        : null; //console.log('Subclass Click'); //this.props.onSubclassClick(index);
    }
  }

  render() {
    let type = this.props.slotType;
    let index = this.props.side + this.props.pos;

    const item = this.props.item;

    const uri = "url(https://bungie.net";

    let backPath;

    if (item) {
      if (item.displayProperties.icon) {
        backPath = uri + item.displayProperties.icon + ")";
      } else {
        backPath = uri + "/img/misc/missing_icon_d2.png)";
      }
    }

    let showPower = true,
      showDamage = true,
      showKinetic = false,
      showStack = true;

    if (settings[2]) {
      showPower = settings[0].isActive;
      showDamage = settings[1].isActive;
      showKinetic = settings[2].isActive;
      showStack = true;
    }

    if (type === "slot item_card") {
      showPower = false;
      showDamage = false;
    }

    if (!showDamage) {
      showKinetic = false;
    }

    let damageType, damageIcon, damageClass, powerLevel, stackCount;

    if (item) {
      // No Subclass Power
      if (item.bucketHash === 3284755031) {
        showPower = false;
      }

      stackCount = item.quantity;
      showStack = stackCount > 1;

      if (item.instance) {
        damageType = item.instance.damageType;
        damageIcon = getDamageIcon(damageType);

        if (!showKinetic && damageIcon === "kinetic") {
          showDamage = false;
        }

        damageClass = "damage_plate " + damageIcon;

        if (item.instance.primaryStat) {
          powerLevel = item.instance.primaryStat.value;
        }
      }
    } else {
      showDamage = false;
      showPower = false;
      showStack = false;
    }

    return (
      <div
        style={{ backgroundImage: backPath }}
        id={this.props.id ? this.props.id : null}
        className={type + " " + index + " "}
        onClick={e => this.handleClick(e)}
      >
        {showDamage && damageType ? (
          <div>
            <div className="slot_corner bl" />
            <div className={damageClass} />
          </div>
        ) : null}
        {showPower && powerLevel > 0 ? (
          <div>
            <p className={"power_plate"}>{powerLevel}</p>
          </div>
        ) : null}
        {showStack ? <p className="stack_plate">{stackCount}</p> : null}
      </div>
    );
  }
}

// Animations

// Switcher
function switcherAnimation(cb, index) {
  const gearBarLeft = document.querySelector(".gear_bar_left");
  const gearBarRight = document.querySelector(".gear_bar_right");

  const subclass = document.querySelector(".subclass_border");
  const hiddenSub = document.querySelector(".hidden_sub");

  const beamSVG = document.querySelector("#beamSVG");
  const leftBeam = document.querySelector("#beamTarget0");
  const rightBeam = document.querySelector("#beamTarget1");
  const rayFocus = document.querySelector(".beamTargetFull");
  const rayFocusLeft = document.querySelector(".beamTargetFullLeft");
  const scanLeftSlots = document.querySelector(".scanner_left_slots");
  const scanLeftSlotsThin = document.querySelector(".scanner_left_slots_thin");
  const scanLeftSlotsBackThin = document.querySelector(".scanner_left_slots_back_thin");
  const scanLeftSlotsBack = document.querySelector(".scanner_left_slots_back");
  const scanRightSlots = document.querySelector(".scanner_right_slots");
  const scanRightSlotsThin = document.querySelector(".scanner_right_slots_thin");
  const scanRightSlotsBackThin = document.querySelector(".scanner_right_slots_back_thin");
  const scanRightSlotsBack = document.querySelector(".scanner_right_slots_back");
  const ray0 = document.querySelector("#beamRay0");
  const ray1 = document.querySelector("#beamRay1");
  const ray2 = document.querySelector("#beamRay2");
  const ray3 = document.querySelector("#beamRay3");
  const ray4 = document.querySelector("#beamRay4");
  const ray5 = document.querySelector("#beamRay5");
  const ray6 = document.querySelector("#beamRay6");
  const ray7 = document.querySelector("#beamRay7");
  const ray8 = document.querySelector("#beamRay8");
  const ray9 = document.querySelector("#beamRay9");
  const ray10 = document.querySelector("#beamRay10");
  const ray11 = document.querySelector("#beamRay11");
  const ray12 = document.querySelector("#beamRay12");
  const ray13 = document.querySelector("#beamRay13");
  const ray14 = document.querySelector("#beamRay14");
  const ray15 = document.querySelector("#beamRay15");

  const svgData = beamSVG.getBoundingClientRect();

  let timeline = new TimelineMax();

      // Randomize Beam Attributes
      const beamAttrs = getRandomBeamAttributes(16);
      timeline.to( ray0, 0, { css: { stroke: beamAttrs.stroke[0], strokeWidth: beamAttrs.strokeWidth[0], strokeDasharray: beamAttrs.strokeDash[0], strokeDashoffset: beamAttrs.strokeDashOffset[0], opacity: 1 } }, 0 );
      timeline.to( ray1, 0, { css: { stroke: beamAttrs.stroke[1], strokeWidth: beamAttrs.strokeWidth[1], strokeDasharray: beamAttrs.strokeDash[1], strokeDashoffset: beamAttrs.strokeDashOffset[1], opacity: 1 } }, 0 );
      timeline.to( ray2, 0, { css: { stroke: beamAttrs.stroke[2], strokeWidth: beamAttrs.strokeWidth[2], strokeDasharray: beamAttrs.strokeDash[2], strokeDashoffset: beamAttrs.strokeDashOffset[2], opacity: 1 } }, 0 );
      timeline.to( ray3, 0, { css: { stroke: beamAttrs.stroke[3], strokeWidth: beamAttrs.strokeWidth[3], strokeDasharray: beamAttrs.strokeDash[3], strokeDashoffset: beamAttrs.strokeDashOffset[3], opacity: 1 } }, 0 );
      timeline.to( ray4, 0, { css: { stroke: beamAttrs.stroke[4], strokeWidth: beamAttrs.strokeWidth[4], strokeDasharray: beamAttrs.strokeDash[4], strokeDashoffset: beamAttrs.strokeDashOffset[4], opacity: 1 } }, 0 );
      timeline.to( ray5, 0, { css: { stroke: beamAttrs.stroke[5], strokeWidth: beamAttrs.strokeWidth[5], strokeDasharray: beamAttrs.strokeDash[5], strokeDashoffset: beamAttrs.strokeDashOffset[5], opacity: 1 } }, 0 );
      timeline.to( ray6, 0, { css: { stroke: beamAttrs.stroke[6], strokeWidth: beamAttrs.strokeWidth[6], strokeDasharray: beamAttrs.strokeDash[6], strokeDashoffset: beamAttrs.strokeDashOffset[6], opacity: 1 } }, 0 );
      timeline.to( ray7, 0, { css: { stroke: beamAttrs.stroke[7], strokeWidth: beamAttrs.strokeWidth[7], strokeDasharray: beamAttrs.strokeDash[7], strokeDashoffset: beamAttrs.strokeDashOffset[7], opacity: 1 } }, 0 );
      timeline.to( ray8, 0, { css: { stroke: beamAttrs.stroke[8], strokeWidth: beamAttrs.strokeWidth[8], strokeDasharray: beamAttrs.strokeDash[8], strokeDashoffset: beamAttrs.strokeDashOffset[8], opacity: 1 } }, 0 );
      timeline.to( ray9, 0, { css: { stroke: beamAttrs.stroke[9], strokeWidth: beamAttrs.strokeWidth[9], strokeDasharray: beamAttrs.strokeDash[9], strokeDashoffset: beamAttrs.strokeDashOffset[9], opacity: 1 } }, 0 );
      timeline.to( ray10, 0, { css: { stroke: beamAttrs.stroke[10], strokeWidth: beamAttrs.strokeWidth[10], strokeDasharray: beamAttrs.strokeDash[10], strokeDashoffset: beamAttrs.strokeDashOffset[10], opacity: 1 } }, 0 );
      timeline.to( ray11, 0, { css: { stroke: beamAttrs.stroke[11], strokeWidth: beamAttrs.strokeWidth[11], strokeDasharray: beamAttrs.strokeDash[11], strokeDashoffset: beamAttrs.strokeDashOffset[11], opacity: 1 } }, 0 );
      timeline.to( ray12, 0, { css: { stroke: beamAttrs.stroke[12], strokeWidth: beamAttrs.strokeWidth[12], strokeDasharray: beamAttrs.strokeDash[12], strokeDashoffset: beamAttrs.strokeDashOffset[12], opacity: 1 } }, 0 );
      timeline.to( ray13, 0, { css: { stroke: beamAttrs.stroke[13], strokeWidth: beamAttrs.strokeWidth[13], strokeDasharray: beamAttrs.strokeDash[13], strokeDashoffset: beamAttrs.strokeDashOffset[13], opacity: 1 } }, 0 );
      timeline.to( ray14, 0, { css: { stroke: beamAttrs.stroke[14], strokeWidth: beamAttrs.strokeWidth[14], strokeDasharray: beamAttrs.strokeDash[14], strokeDashoffset: beamAttrs.strokeDashOffset[14], opacity: 1 } }, 0 );
      timeline.to( ray15, 0, { css: { stroke: beamAttrs.stroke[15], strokeWidth: beamAttrs.strokeWidth[15], strokeDasharray: beamAttrs.strokeDash[15], strokeDashoffset: beamAttrs.strokeDashOffset[15], opacity: 1 } }, 0 );
  

  if (hiddenSub) {

    const topLeft = document.querySelector( '.left6' );
    const topRight = document.querySelector( '.right8' );

    const launchInfoLeft = beamLaunchInfo( leftBeam, topLeft );
    let launchXLeft = launchInfoLeft.end[0] - launchInfoLeft.start[0];
    let launchYLeft = launchInfoLeft.end[1] - launchInfoLeft.start[1];

    const launchInfoRight = beamLaunchInfo( rightBeam, topRight );
    let launchXRight = launchInfoRight.end[0] - launchInfoRight.start[0];
    let launchYRight = launchInfoRight.end[1] - launchInfoRight.start[1];

    const pathElLeft = document.querySelector( "#beamPathElLeft" );
    const beamStartLeft = buildBeam( rayFocusLeft );
    const beamPathLeft = buildBeam( scanLeftSlotsBack );
    const beamPathLeft2 = buildBeam( scanLeftSlotsBackThin );
    const beamPathLeft3 = buildBeam( scanLeftSlotsThin );
    const beamPathLeft4 = buildBeam( scanLeftSlots );
    const beamPathLeft5 = buildBeam( rayFocusLeft );

    // 0, .2, .35, .45, .55, .7, .9
    timeline.set( pathElLeft, { attr: { d: beamStartLeft }, css:{ opacity: .6 } }, 0 );
    timeline.to( pathElLeft, .25, { attr: { d: beamPathLeft }, ease: Power2.easeIn }, 0 );
    timeline.to( pathElLeft, .2, { attr: { d: beamPathLeft2 }, ease: Power2.easeNone }, .25 );
    timeline.to( pathElLeft, .15, { attr: { d: beamPathLeft3 }, ease: Power2.easeNone }, .45 );
    timeline.to( pathElLeft, .15, { attr: { d: beamPathLeft4 }, ease: Power2.easeNone }, .6 );
    timeline.to( pathElLeft, .25, { attr: { d: beamPathLeft5 }, ease: Power2.easeNone }, .75 );
    timeline.set( pathElLeft, { css: { opacity: 0 } }, 1 );
    timeline.set( pathElLeft, { attr: { d: "" } }, 1 );

    const pathElRight = document.querySelector( "#beamPathElRight" );
    const beamStartRight = buildBeam( rayFocus );
    const beamPathRight = buildBeam( scanRightSlotsBack );
    const beamPathRight2 = buildBeam( scanRightSlotsBackThin );
    const beamPathRight3 = buildBeam( scanRightSlotsThin );
    const beamPathRight4 = buildBeam( scanRightSlots );
    const beamPathRight5 = buildBeam( rayFocus );

    // 0, .2, .35, .45, .55, .7, .9
    timeline.set( pathElRight, { attr: { d: beamStartRight }, css:{ opacity: .6 } }, 0 );
    timeline.to( pathElRight, .25, { attr: { d: beamPathRight }, ease: Power2.easeIn }, 0 );
    timeline.to( pathElRight, .2, { attr: { d: beamPathRight2 }, ease: Power2.easeNone }, .25 );
    timeline.to( pathElRight, .15, { attr: { d: beamPathRight3 }, ease: Power2.easeNone }, .45 );
    timeline.to( pathElRight, .15, { attr: { d: beamPathRight4 }, ease: Power2.easeNone }, .6 );
    timeline.to( pathElRight, .25, { attr: { d: beamPathRight5 }, ease: Power2.easeNone }, .75 );
    timeline.set( pathElRight, { css: { opacity: 0 } }, 1 );
    timeline.set( pathElRight, { attr: { d: "" } }, 1 );


    timeline.call( moveRaysTo, [ 2, rayFocusLeft, "square", 0, Power2.easeNone ], null, 0 );
    timeline.call( moveRaysTo, [ 1, rayFocus, "square", 0, Power2.easeNone ], null, 0 );

    timeline.call( moveRaysTo, [ 2, scanLeftSlotsBack, "tall", .25, Power2.easeIn ], null, 0 );
    timeline.call( moveRaysTo, [ 1, scanRightSlotsBack, "tall", .25, Power2.easeIn ], null, 0 );

    timeline.call( moveRaysTo, [ 2, scanLeftSlotsBackThin, "tall", .2, Power2.easeNone ], null, .25 );
    timeline.call( moveRaysTo, [ 1, scanRightSlotsBackThin, "tall", .2, Power2.easeNone ], null, .25 );

    timeline.call( moveRaysTo, [ 2, scanLeftSlotsThin, "tall", .15, Power2.easeNone ], null, .45 );
    timeline.call( moveRaysTo, [ 1, scanRightSlotsThin, "tall", .15, Power2.easeNone ], null, .45 );

    timeline.call( moveRaysTo, [ 2, scanLeftSlots, "tall", .15, Power2.easeNone ], null, .6 );
    timeline.call( moveRaysTo, [ 1, scanRightSlots, "tall", .15, Power2.easeNone ], null, .6 );
    
    timeline.call( moveRaysTo, [ 2, rayFocusLeft, "square", .25, Power2.easeNone ], null, .75 );
    timeline.call( moveRaysTo, [ 1, rayFocus, "square", .25, Power2.easeNone ], null, .75 );

    timeline.set( ".beamRay", { css: { opacity: 0 } }, 1 );

    // Launch Beam Targets
    timeline.to( leftBeam, .25, { css: { x: launchXLeft + "px", y: launchYLeft + "px", width: 75, height: 235, border: "2px solid rgba(0, 191, 255, 1)", backgroundColor: "rgba(0, 191, 255, .6)"},ease: Power2.easeIn },0);
    timeline.to( rightBeam, .25, { css: { x: launchXRight + "px", y: launchYRight + "px", width: 75, height: 155, border: "2px solid rgba(0, 191, 255, 1)", backgroundColor: "rgba(0, 191, 255, .6)"},ease: Power2.easeIn },0);

    // Shrink Beam Targets Out
    timeline.to( leftBeam, .2, { css: { width: 2 }, ease: Linear.easeNone}, .25 );
    timeline.to( rightBeam, .2, { css: { width: 2, x: launchXRight + 73 + "px" }, ease: Linear.easeNone }, .25 );

    // Shrink Bars Out
    timeline.to( gearBarLeft, 0.15, {css: { scaleX: .2, transformOrigin: "0% 50%" }, ease: Linear.easeNone }, .25 );
    timeline.to( gearBarRight, 0.15, { css: { scaleX: .2, transformOrigin: "100% 50%" }, ease: Linear.easeNone }, .25 );

    // Expand Beam Targets Up
    timeline.to( leftBeam, .15, { css: { y: launchYLeft - 70 + "px", height: 400 }, ease: Power2.easeNone }, .45 );
    timeline.to( rightBeam, .15, { css: { y: launchYRight - 160 + "px", height: 475 }, ease: Power2.easeNone }, .45 );

    // Expand Bars Up
    // Scale over 1 to account for bigger front bars
    timeline.to( gearBarLeft, 0.15, { css: { scaleY: 1.5, transformOrigin: "0% 50%" }, ease: Linear.easeNone }, .45 );
    timeline.to( gearBarRight, 0.15, { css: { scaleY: 2.6, transformOrigin: "100% 50%" }, ease: Linear.easeNone}, .45 );

    // Trigger State Change
    timeline.call( cb, [index], null, 0.6 );

    // Scale Bars Back To Normal Height
    timeline.set( gearBarLeft, { css: { scaleY: 1 } }, 0.6 );
    timeline.set( gearBarRight, { css: { scaleY: 1 } }, 0.6 );

    // Expand Beam Targets In
    timeline.to( leftBeam, 0.15, { css: { width: 75 }, ease: Linear.easeNone }, 0.6 );
    timeline.to( rightBeam, 0.15, { css: { width: 75, x: launchXRight + "px" }, ease: Linear.easeNone }, 0.6 );

    // Expand Bars In
    timeline.to( gearBarLeft, .15, { css: { scaleX: 1, transformOrigin: "0% 50%" }, ease: Linear.easeNone }, 0.6 );
    timeline.to( gearBarRight, .15, { css: { scaleX: 1, transformOrigin: "100% 50%" }, ease: Linear.easeNone }, 0.6 );

    // Return Beams to Ghost
    timeline.to( leftBeam, 0.25, { css: { x: "0", y: "0", width: ".05em", height: ".05em", borderColor: "none", backgroundColor: "none" }, ease: Power2.easeNone }, .75 );
    timeline.to( rightBeam, 0.25, { css: { x: "0", y: "0", width: ".05em", height: ".05em", borderColor: "none", backgroundColor: "none" }, ease: Power2.easeNone }, .75 );

    // Expand Subclass / Remove Switched Class
    timeline.to(subclass, 0.15, { css: { scale: 1, transformOrigin: "50% 50%" }, ease: Linear.easeNone }, 0.75 );

  } else {

    const topLeft = document.querySelector( '.left1' );
    const topRight = document.querySelector( '.right1' );

    const launchInfoLeft = beamLaunchInfo( leftBeam, topLeft );
    let launchXLeft = launchInfoLeft.end[0] - launchInfoLeft.start[0];
    let launchYLeft = launchInfoLeft.end[1] - launchInfoLeft.start[1];

    const launchInfoRight = beamLaunchInfo( rightBeam, topRight );
    let launchXRight = launchInfoRight.end[0] - launchInfoRight.start[0];
    let launchYRight = launchInfoRight.end[1] - launchInfoRight.start[1];

    const pathElLeft = document.querySelector( "#beamPathElLeft" );
    const beamStartLeft = buildBeam( rayFocusLeft );
    const beamPathLeft = buildBeam( scanLeftSlots );
    const beamPathLeft2 = buildBeam( scanLeftSlotsThin );
    const beamPathLeft3 = buildBeam( scanLeftSlotsBackThin );
    const beamPathLeft4 = buildBeam( scanLeftSlotsBack );
    const beamPathLeft5 = buildBeam( rayFocusLeft );

    // 0, .2, .35, .45, .55, .7, .9
    timeline.set( pathElLeft, { attr: { d: beamStartLeft }, css:{ opacity: .6 } }, 0 );
    timeline.to( pathElLeft, .25, { attr: { d: beamPathLeft }, ease: Power2.easeIn }, 0 );
    timeline.to( pathElLeft, .2, { attr: { d: beamPathLeft2 }, ease: Power2.easeNone }, .25 );
    timeline.to( pathElLeft, .15, { attr: { d: beamPathLeft3 }, ease: Power2.easeNone }, .45 );
    timeline.to( pathElLeft, .15, { attr: { d: beamPathLeft4 }, ease: Power2.easeNone }, .6 );
    timeline.to( pathElLeft, .25, { attr: { d: beamPathLeft5 }, ease: Power2.easeNone }, .75 );
    timeline.set( pathElLeft, { css: { opacity: 0 } }, 1 );
    timeline.set( pathElLeft, { attr: { d: "" } }, 1 );

    const pathElRight = document.querySelector( "#beamPathElRight" );
    const beamStartRight = buildBeam( rayFocus );
    const beamPathRight = buildBeam( scanRightSlots );
    const beamPathRight2 = buildBeam( scanRightSlotsThin );
    const beamPathRight3 = buildBeam( scanRightSlotsBackThin );
    const beamPathRight4 = buildBeam( scanRightSlotsBack );
    const beamPathRight5 = buildBeam( rayFocus );

    // 0, .2, .35, .45, .55, .7, .9
    timeline.set( pathElRight, { attr: { d: beamStartRight }, css:{ opacity: .6 } }, 0 );
    timeline.to( pathElRight, .25, { attr: { d: beamPathRight }, ease: Power2.easeIn }, 0 );
    timeline.to( pathElRight, .2, { attr: { d: beamPathRight2 }, ease: Power2.easeNone }, .25 );
    timeline.to( pathElRight, .15, { attr: { d: beamPathRight3 }, ease: Power2.easeNone }, .45 );
    timeline.to( pathElRight, .15, { attr: { d: beamPathRight4 }, ease: Power2.easeNone }, .6 );
    timeline.to( pathElRight, .25, { attr: { d: beamPathRight5 }, ease: Power2.easeNone }, .75 );
    timeline.set( pathElRight, { css: { opacity: 0 } }, 1 );
    timeline.set( pathElRight, { attr: { d: "" } }, 1 );

    timeline.call( moveRaysTo, [ 2, rayFocusLeft, "square", 0, Power2.easeNone ], null, 0 );
    timeline.call( moveRaysTo, [ 1, rayFocus, "square", 0, Power2.easeNone ], null, 0 );

    timeline.call( moveRaysTo, [ 2, scanLeftSlots, "tall", .25, Power2.easeIn ], null, 0 );
    timeline.call( moveRaysTo, [ 1, scanRightSlots, "tall", .25, Power2.easeIn ], null, 0 );

    timeline.call( moveRaysTo, [ 2, scanLeftSlotsThin, "tall", .2, Power2.easeNone ], null, .25 );
    timeline.call( moveRaysTo, [ 1, scanRightSlotsThin, "tall", .2, Power2.easeNone ], null, .25 );

    timeline.call( moveRaysTo, [ 2, scanLeftSlotsBackThin, "tall", .15, Power2.easeNone ], null, .45 );
    timeline.call( moveRaysTo, [ 1, scanRightSlotsBackThin, "tall", .15, Power2.easeNone ], null, .45 );

    timeline.call( moveRaysTo, [ 2, scanLeftSlotsBack, "tall", .15, Power2.easeNone ], null, .6 );
    timeline.call( moveRaysTo, [ 1, scanRightSlotsBack, "tall", .15, Power2.easeNone ], null, .6 );
    
    timeline.call( moveRaysTo, [ 2, rayFocusLeft, "square", .25, Power2.easeNone ], null, .75 );
    timeline.call( moveRaysTo, [ 1, rayFocus, "square", .25, Power2.easeNone ], null, .75 );

    timeline.set( ".beamRay", { css: { opacity: 0 } }, 1 );

    // Launch Beam Targets
    timeline.to( leftBeam, .25, { css: { x: launchXLeft + "px", y: launchYLeft + "px", width: 75, height: 400, border: "2px solid rgba(0, 191, 255, 1)", backgroundColor: "rgba(0, 191, 255, .6)"},ease: Power2.easeIn },0);
    timeline.to( rightBeam, .25, { css: { x: launchXRight + "px", y: launchYRight + "px", width: 75, height: 475, border: "2px solid rgba(0, 191, 255, 1)", backgroundColor: "rgba(0, 191, 255, .6)"},ease: Power2.easeIn },0);

    // Shrink Beam Targets Out
    timeline.to( leftBeam, .2, { css: { width: 2 }, ease: Linear.easeNone}, .25 );
    timeline.to( rightBeam, .2, { css: { width: 2, x: launchXRight + 73 + "px" }, ease: Linear.easeNone }, .25 );
    
    // Shrink Bars Out
    timeline.to( gearBarLeft, 0.2, {css: { scaleX: 0.01, transformOrigin: "0% 50%" },ease: Linear.easeNone}, .25 );
    timeline.to( gearBarRight, 0.2, {css: { scaleX: 0.01, transformOrigin: "100% 50%" },ease: Linear.easeNone}, .25 );

    // Shrink Subclass / Add Switched Class
    timeline.to( subclass, 0.15, { css: { scale: 0, transformOrigin: "50% 50%" }, ease: Linear.easeNone }, 0 );

    // Shrink Beam Targets Down
    timeline.to( leftBeam, 0.15, { css: { y: launchYLeft + 70 + "px", height: 235 }, ease: Linear.easeNone}, 0.45 );
    timeline.to( rightBeam, 0.15, { css: { y: launchYRight + 160 + "px", height: 155 }, ease: Linear.easeNone }, 0.45 );

    // Shrink Bars Down
    timeline.to( gearBarLeft, 0.15, { css: { scaleY: 0.69, transformOrigin: "0% 50%" },ease: Linear.easeNone}, 0.45 );
    timeline.to( gearBarRight, 0.15, { css: { scaleY: 0.38, transformOrigin: "100% 50%" },ease: Linear.easeNone}, 0.45 );

    // Trigger State Change
    timeline.call( cb, [index], null, 0.6 );

    // Expand Bars Up
    timeline.to( gearBarLeft, 0.15, { css: { scaleY: 1, transformOrigin: "0% 50%" }, ease: Linear.easeNone }, 0.6 );
    timeline.to( gearBarRight, 0.15, { css: { scaleY: 1, transformOrigin: "100% 50%" },ease: Linear.easeNone }, 0.6 );

    // Expand Beam Targets In
    timeline.to( leftBeam, 0.15, { css: { width: 75 }, ease: Linear.easeNone }, 0.6 );
    timeline.to( rightBeam, 0.15, { css: { width: 75, x: launchXRight + "px" }, ease: Linear.easeNone }, 0.6 );

    // Expand Bars In
    timeline.to( gearBarLeft, 0.25, { css: { scaleX: 1, transformOrigin: "0% 50%" }, ease: Linear.easeNone }, 0.75 );
    timeline.to( gearBarRight, 0.25, { css: { scaleX: 1, transformOrigin: "100% 50%" }, ease: Linear.easeNone }, 0.75 );

    // Return Beams to Ghost
    timeline.to( leftBeam, 0.25, { css: { x: "0", y: "0", width: ".05em", height: ".05em", borderColor: "none", backgroundColor: "none" }, ease: Power2.easeNone }, .75 );
    timeline.to( rightBeam, 0.25, { css: { x: "0", y: "0", width: ".05em", height: ".05em", borderColor: "none", backgroundColor: "none" }, ease: Power2.easeNone }, .75 );

  }
}

// Slot Focus
//    Hides unfocused slots / subclass / inventory buttons
//    and focuses the selected slot
function focusSetup(side, pos, trigger) {
  const focusClass = "slot " + side + pos + " ";

  const ghost = document.querySelector(".ghost");
  const defRing = document.querySelector(".default_ring");
  const statBar = document.querySelector(".stat_bar");
  const invBtns = document.querySelector(".inventory_button_container");
  const subclass = document.querySelector(".subclass_border");
  const allSlots = document.querySelectorAll(".slot");

  const beamSVG = document.querySelector("#beamSVG");
  const focusBeam = document.querySelector("#beamTarget0");
  const endEl = document.querySelector("#beamTarget4");
  const ray0 = document.querySelector("#beamRay0");
  const ray1 = document.querySelector("#beamRay1");
  const ray2 = document.querySelector("#beamRay2");
  const ray3 = document.querySelector("#beamRay3");
  const ray4 = document.querySelector("#beamRay4");
  const ray5 = document.querySelector("#beamRay5");
  const ray6 = document.querySelector("#beamRay6");
  const ray7 = document.querySelector("#beamRay7");

  const svgData = beamSVG.getBoundingClientRect();

  let timeline = new TimelineMax();

  // Hide Stat Bar
  timeline.to(
    statBar,
    0.25,
    { css: { scaleY: 0, transformOrigin: "50% 0%" }, ease: Power2.easeOut },
    0
  );

  // Hide Inventory Button Container
  timeline.to(
    invBtns,
    0.25,
    { css: { scaleY: 0, transformOrigin: "50% 100%" }, ease: Power2.easeOut },
    0
  );

  // Hide Subclass
  timeline.to(subclass, 0.25, { css: { scale: 0 }, ease: Power2.easeOut }, 0);

  // Set Beam Ray Positions
  // timeline.to( ray0, 0, { attr: { x1: '50%', y1: '50%' } }, 0 );

  // Shift Ghost / Hide Ring
  timeline.to(defRing, 0.5, { autoAlpha: 0 }, 0);
  ghost.classList.remove("default");
  ghost.classList.add(side);

  if (side === "left") {
    timeline.to(
      ghost,
      0.5,
      { css: { scale: 2, x: -100, y: 15 }, ease: Power2.easeOut },
      0
    );
  } else if (side === "right") {
    timeline.to(
      ghost,
      0.5,
      { css: { scale: 2, x: 100, y: 15 }, ease: Power2.easeOut },
      0
    );
  }

  // Hide Unfocused Slots
  for (let i = 0; i < allSlots.length; i++) {
    let thisSlot = allSlots[i];

    // If slot is the clicked slot
    if (thisSlot.className === focusClass) {

      // Position the return point for the beam
      if ( side === "left" ) {
        timeline.to( endEl, 0, { css: { x:-100 + "px", y: 15 + "px" } }, 0 );
      } else {
        timeline.to( endEl, 0, { css: { x: 100 + "px", y: 15 + "px" } }, 0 );
      }
      
      // Decide which focus target for beam to move to
      const beamTargetSelector = side === "left" ? "#scan_focus_target" : "#scan_focus_target_right";
      const beamTargetSelector1 = side === "left" ? ".scan_beam_thin_target" : ".scan_beam_thin_target_right";
      const beamTargetSelector2 = side === "left" ? ".scanner_bucket" : ".scanner_bucket_right";

      const pathEl = document.querySelector( "#beamPathEl" );
      const beamStart = buildBeam( focusBeam );
      const beamPath = buildBeam( thisSlot, side );
      const beamPath2 = buildBeam( document.querySelector( beamTargetSelector ), side );
      const beamPath3 = buildBeam( document.querySelector( beamTargetSelector1 ), side );
      const beamPath4 = buildBeam( document.querySelector( beamTargetSelector2 ), side );
      const beamEnd = buildBeam( endEl, side );
      timeline.to( pathEl,  0, { attr: { d: beamStart }, css:{ opacity: .8 }, }, 0 );
      // Beam to Clicked Slot
      timeline.to( pathEl, .5, { attr: { d: beamPath }, ease: Power2.easeOut }, 0 );
      // Beam to Focus
      timeline.to( pathEl, .5, { attr: { d: beamPath2 }, ease: Power2.easeInOut }, .5 );
      // Beam to bucket start
      timeline.to( pathEl, 0.1, { attr: { d: beamPath3 }, ease: Power2.easeInOut }, 1 );
      // Beam to bucket
      timeline.to( pathEl, 0.5, { attr: { d: beamPath4 }, ease: Power2.easeInOut }, 1.1);
      // Return Beam to Ghost
      timeline.to( pathEl,  .5, { attr: { d: beamEnd }, ease: Power2.easeOut }, 1.6 );
      timeline.to( pathEl,  0, { attr: { d: "" } }, 2.1 );
      timeline.to( endEl, 0, { css: { opacity: 0 } }, 2.1 );

      const moveInfo = getMoveInfo(thisSlot);
      const start = moveInfo.start;
      const end = moveInfo.end;
      let dX = end[0] - start[0];
      let dY = end[1] - start[1];

      const launchInfo = beamLaunchInfo(focusBeam, thisSlot);
      let launchX = launchInfo.end[0] - launchInfo.start[0];
      let launchY = launchInfo.end[1] - launchInfo.start[1];
      let rayLaunchX = launchInfo.end[0] - svgData.left;
      let rayLaunchY = launchInfo.end[1];

      const beamMoveInfo = getMoveInfo(focusBeam);
      let beamMoveX = beamMoveInfo.end[0] - beamMoveInfo.start[0];
      let beamMoveY = beamMoveInfo.end[1] - beamMoveInfo.start[1];
      let rayMoveX = beamMoveInfo.end[0] - svgData.left;
      let rayMoveY = beamMoveInfo.end[1];

      let svgCenterX = svgData.width * 0.5;
      let svgCenterY = svgData.height * 0.5;
      let rayOriginX = side === "left" ? svgCenterX - 100 : svgCenterX + 100;
      let rayOriginY = svgCenterY + 15;

      // Randomize Beam Attributes
      const beamAttrs = getRandomBeamAttributes(8);
      timeline.to( ray0, 0, { css: { stroke: beamAttrs.stroke[0], strokeWidth: beamAttrs.strokeWidth[0], strokeDasharray: beamAttrs.strokeDash[0], strokeDashoffset: beamAttrs.strokeDashOffset[0] } }, 0 );
      timeline.to( ray1, 0, { css: { stroke: beamAttrs.stroke[1], strokeWidth: beamAttrs.strokeWidth[1], strokeDasharray: beamAttrs.strokeDash[1], strokeDashoffset: beamAttrs.strokeDashOffset[1] } }, 0 );
      timeline.to( ray2, 0, { css: { stroke: beamAttrs.stroke[2], strokeWidth: beamAttrs.strokeWidth[2], strokeDasharray: beamAttrs.strokeDash[2], strokeDashoffset: beamAttrs.strokeDashOffset[2] } }, 0 );
      timeline.to( ray3, 0, { css: { stroke: beamAttrs.stroke[3], strokeWidth: beamAttrs.strokeWidth[3], strokeDasharray: beamAttrs.strokeDash[3], strokeDashoffset: beamAttrs.strokeDashOffset[3] } }, 0 );
      timeline.to( ray4, 0, { css: { stroke: beamAttrs.stroke[4], strokeWidth: beamAttrs.strokeWidth[4], strokeDasharray: beamAttrs.strokeDash[4], strokeDashoffset: beamAttrs.strokeDashOffset[4] } }, 0 );
      timeline.to( ray5, 0, { css: { stroke: beamAttrs.stroke[5], strokeWidth: beamAttrs.strokeWidth[5], strokeDasharray: beamAttrs.strokeDash[5], strokeDashoffset: beamAttrs.strokeDashOffset[5] } }, 0 );
      timeline.to( ray6, 0, { css: { stroke: beamAttrs.stroke[6], strokeWidth: beamAttrs.strokeWidth[6], strokeDasharray: beamAttrs.strokeDash[6], strokeDashoffset: beamAttrs.strokeDashOffset[6] } }, 0 );
      timeline.to( ray7, 0, { css: { stroke: beamAttrs.stroke[7], strokeWidth: beamAttrs.strokeWidth[7], strokeDasharray: beamAttrs.strokeDash[7], strokeDashoffset: beamAttrs.strokeDashOffset[7] } }, 0 );

      // Set Beam Ray Positions
      timeline.to(ray0,0,{attr: {x1: svgCenterX,y1: svgCenterY,x2: launchInfo.data.x - svgData.left,y2: launchInfo.data.y}},0);
      timeline.to(ray1,0,{ attr: {x1: svgCenterX,y1: svgCenterY,x2: launchInfo.data.right - svgData.left,y2: launchInfo.data.y}},0);
      timeline.to(ray2,0,{attr: {x1: svgCenterX,y1: svgCenterY,x2: launchInfo.data.x - svgData.left,y2: launchInfo.data.bottom}},0);
      timeline.to(ray3,0,{attr: {x1: svgCenterX,y1: svgCenterY,x2: launchInfo.data.right - svgData.left,y2: launchInfo.data.bottom}},0);
      timeline.to(ray4,0,{attr: {x1: svgCenterX,y1: svgCenterY,x2: launchInfo.data.x - svgData.left,y2: launchInfo.data.y}},0);
      timeline.to(ray5,0,{attr: {x1: svgCenterX,y1: svgCenterY,x2: launchInfo.data.right - svgData.left,y2: launchInfo.data.y}},0);
      timeline.to(ray6,0,{attr: { x1: svgCenterX,y1: svgCenterY, x2: launchInfo.data.x - svgData.left, y2: launchInfo.data.bottom}},0);
      timeline.to(ray7,0,{attr: {x1: svgCenterX,y1: svgCenterY,x2: launchInfo.data.right - svgData.left,y2: launchInfo.data.bottom}},0);

      timeline.to( ray0, 0, { css: { opacity: 1 } }, 0 );
      timeline.to( ray1, 0, { css: { opacity: 1 } }, 0 );
      timeline.to( ray2, 0, { css: { opacity: 1 } }, 0 );
      timeline.to( ray3, 0, { css: { opacity: 1 } }, 0 );
      timeline.to( ray4, 0, { css: { opacity: 1 } }, 0 );
      timeline.to( ray5, 0, { css: { opacity: 1 } }, 0 );
      timeline.to( ray6, 0, { css: { opacity: 1 } }, 0 );
      timeline.to( ray7, 0, { css: { opacity: 1 } }, 0 );

      if (moveInfo.dims === 55) {
        dX = dX + 5;
        dY = dY + 5;
      }

      if (side === "right") {
        // let extra = window.innerHeight < 620 ? 184 : 204; // 167 : 197
        let extra = 245;

        dX = dX + extra;
        beamMoveX = beamMoveX + extra;
        rayMoveX = rayMoveX + extra;
      }

      // Shift Focus
      if (moveInfo.dims === 70) {
        dY = dY + 2;
        timeline.to(
          thisSlot,
          0.5,
          { css: { width: 75, height: 75 }, ease: Power2.easeInOut },
          0
        );
      }
      if (moveInfo.dims === 65) {
        if (side !== "right") {
          // dX = dX + 2.5;
        }
        dY = dY + 4;
        timeline.to(
          thisSlot,
          0.5,
          { css: { width: 75, height: 75 }, ease: Power2.easeInOut },
          0
        );
      }

      // Move Beam to Clicked Slot
      timeline.to( focusBeam, 0.5, { css: { x: launchX + "px", y: launchY + "px", width: launchInfo.dims, height: launchInfo.dims, border: "2px solid rgba(0, 191, 255, .85)", backgroundColor: "rgba(0, 191, 255, .75)"},ease: Power2.easeOut},0);

      // Move Beam Ray Origins to Ghost
      timeline.to(ray0,0.5,{ attr: { x1: rayOriginX, y1: rayOriginY }, ease: Power2.easeOut },0);
      timeline.to(ray1,0.5,{ attr: { x1: rayOriginX, y1: rayOriginY }, ease: Power2.easeOut },0);
      timeline.to(ray2,0.5,{ attr: { x1: rayOriginX, y1: rayOriginY }, ease: Power2.easeOut },0);
      timeline.to(ray3,0.5,{ attr: { x1: rayOriginX, y1: rayOriginY }, ease: Power2.easeOut },0);
      timeline.to(ray4,0.5,{ attr: { x1: rayOriginX, y1: rayOriginY }, ease: Power2.easeOut },0);
      timeline.to(ray5,0.5,{ attr: { x1: rayOriginX, y1: rayOriginY }, ease: Power2.easeOut },0);
      timeline.to(ray6,0.5,{ attr: { x1: rayOriginX, y1: rayOriginY }, ease: Power2.easeOut },0);
      timeline.to(ray7,0.5,{ attr: { x1: rayOriginX, y1: rayOriginY }, ease: Power2.easeOut },0);

      // Move Beam Rays to Clicked Slot
      timeline.to( ray0, 0.5, { attr: { x2: rayLaunchX, y2: rayLaunchY }, ease: Power2.easeOut }, 0 );
      timeline.to( ray1, 0.5, { attr: { x2: rayLaunchX + launchInfo.dims, y2: rayLaunchY }, ease: Power2.easeOut }, 0 );
      timeline.to( ray2, 0.5, { attr: { x2: rayLaunchX, y2: rayLaunchY + launchInfo.dims }, ease: Power2.easeOut }, 0 );
      timeline.to( ray3, 0.5, { attr: { x2: rayLaunchX + launchInfo.dims, y2: rayLaunchY + launchInfo.dims }, ease: Power2.easeOut }, 0 );
      timeline.to( ray4, 0.5, { attr: { x2: rayLaunchX + launchInfo.dims * 0.5, y2: rayLaunchY }, ease: Power2.easeOut }, 0 );
      timeline.to( ray5, 0.5, { attr: { x2: rayLaunchX + launchInfo.dims * 0.5, y2: rayLaunchY + launchInfo.dims }, ease: Power2.easeOut }, 0 );
      timeline.to( ray6, 0.5, { attr: { x2: rayLaunchX, y2: rayLaunchY + launchInfo.dims * 0.5 }, ease: Power2.easeOut }, 0 );
      timeline.to( ray7, 0.5, { attr: { x2: rayLaunchX + launchInfo.dims, y2: rayLaunchY + launchInfo.dims * 0.5 }, ease: Power2.easeOut }, 0 );

      // Move Beam and Slot to Focus
      timeline.to( thisSlot, 0.5, { css: { x: dX + "px", y: dY + "px" }, ease: Power2.easeInOut }, 0.5 );
      timeline.to( focusBeam, 0.5, { css: { x: beamMoveX + "px", y: beamMoveY + "px" }, ease: Power2.easeInOut }, 0.5 );

      // Move Beam Rays to Focus
      timeline.to( ray0, 0.5, { attr: { x2: rayMoveX,                         y2: rayMoveY }, ease: Power2.easeInOut }, 0.5 );
      timeline.to( ray1, 0.5, { attr: { x2: rayMoveX + launchInfo.dims,       y2: rayMoveY }, ease: Power2.easeInOut }, 0.5 );
      timeline.to( ray2, 0.5, { attr: { x2: rayMoveX,                         y2: rayMoveY + launchInfo.dims }, ease: Power2.easeInOut }, 0.5 );
      timeline.to( ray3, 0.5, { attr: { x2: rayMoveX + launchInfo.dims,       y2: rayMoveY + launchInfo.dims }, ease: Power2.easeInOut }, 0.5 );
      timeline.to( ray4, 0.5, { attr: { x2: rayMoveX + launchInfo.dims * 0.5, y2: rayMoveY }, ease: Power2.easeInOut }, 0.5 );
      timeline.to( ray5, 0.5, { attr: { x2: rayMoveX + launchInfo.dims * 0.5, y2: rayMoveY + launchInfo.dims }, ease: Power2.easeInOut }, 0.5 );
      timeline.to( ray6, 0.5, { attr: { x2: rayMoveX,                         y2: rayMoveY + launchInfo.dims * 0.5 }, ease: Power2.easeInOut }, 0.5 );
      timeline.to( ray7, 0.5, { attr: { x2: rayMoveX + launchInfo.dims,       y2: rayMoveY + launchInfo.dims * 0.5 }, ease: Power2.easeInOut }, 0.5 );

      // Move Beam to Bucket
      if ( side === 'left' ) {
        timeline.to( focusBeam, 0.1, { css: { x: beamMoveX + 85 + "px", width: ".05em" }, ease: Power2.easeInOut }, 1);
      } else if ( side === 'right' ) {
        timeline.to( focusBeam, 0.1, { css: { x: beamMoveX - 10 + "px", width: ".05em" }, ease: Power2.easeInOut }, 1);
      }

      // Move Beam Rays to Bucket
      if ( side === 'left' ) {
        timeline.to( ray0, 0.1, { attr: { x2: rayMoveX + 85                         }, ease: Power2.easeInOut }, 1 );
        timeline.to( ray1, 0.1, { attr: { x2: rayMoveX + launchInfo.dims + 10       }, ease: Power2.easeInOut }, 1 );
        timeline.to( ray2, 0.1, { attr: { x2: rayMoveX + 85                         }, ease: Power2.easeInOut }, 1 );
        timeline.to( ray3, 0.1, { attr: { x2: rayMoveX + launchInfo.dims + 10       }, ease: Power2.easeInOut }, 1 );
        timeline.to( ray4, 0.1, { attr: { x2: rayMoveX + launchInfo.dims * 0.5 + 45 }, ease: Power2.easeInOut }, 1 );
        timeline.to( ray5, 0.1, { attr: { x2: rayMoveX + launchInfo.dims * 0.5 + 45 }, ease: Power2.easeInOut }, 1 );
        timeline.to( ray6, 0.1, { attr: { x2: rayMoveX + 85                         }, ease: Power2.easeInOut }, 1 );
        timeline.to( ray7, 0.1, { attr: { x2: rayMoveX + launchInfo.dims + 10       }, ease: Power2.easeInOut }, 1 );
      } else if ( side === 'right' ) {
        timeline.to( ray0, 0.1, { attr: { x2: rayMoveX - 10                         }, ease: Power2.easeInOut }, 1 );
        timeline.to( ray1, 0.1, { attr: { x2: rayMoveX - launchInfo.dims + 65       }, ease: Power2.easeInOut }, 1 );
        timeline.to( ray2, 0.1, { attr: { x2: rayMoveX - 10                         }, ease: Power2.easeInOut }, 1 );
        timeline.to( ray3, 0.1, { attr: { x2: rayMoveX - launchInfo.dims + 65       }, ease: Power2.easeInOut }, 1 );
        timeline.to( ray4, 0.1, { attr: { x2: rayMoveX - launchInfo.dims * 0.5 + 25 }, ease: Power2.easeInOut }, 1 );
        timeline.to( ray5, 0.1, { attr: { x2: rayMoveX - launchInfo.dims * 0.5 + 25 }, ease: Power2.easeInOut }, 1 );
        timeline.to( ray6, 0.1, { attr: { x2: rayMoveX - 10                         }, ease: Power2.easeInOut }, 1 );
        timeline.to( ray7, 0.1, { attr: { x2: rayMoveX - launchInfo.dims + 65       }, ease: Power2.easeInOut }, 1 );
      }


      // Expand Beam to Bucket
      if ( side === 'left' ) {
        timeline.to( focusBeam, 0.5, { css: { width: "234px", height: "234px" }, ease: Power2.easeInOut }, 1.1);
      } else if ( side === 'right' ) {
        timeline.to( focusBeam, 0.5, { css: { x: beamMoveX - 242 + "px", width: "234px", height: "234px" }, ease: Power2.easeInOut }, 1.1);
      }
      

      // Expand Beam Rays to Bucket
      if ( side === 'left' ) {
        // ray0 stays
        timeline.to( ray1, 0.5, { attr: { x2: rayMoveX + launchInfo.dims + 242 }, ease: Power2.easeInOut }, 1.1 );
        timeline.to( ray2, 0.5, { attr: { y2: rayMoveY + launchInfo.dims + 159 }, ease: Power2.easeInOut }, 1.1 );
        timeline.to( ray3, 0.5, { attr: { x2: rayMoveX + launchInfo.dims + 242, y2: rayMoveY + launchInfo.dims + 159 }, ease: Power2.easeInOut }, 1.1 );
        timeline.to( ray4, 0.5, { attr: { x2: rayMoveX + launchInfo.dims * 0.5 + 167 }, ease: Power2.easeInOut }, 1.1 );
        timeline.to( ray5, 0.5, { attr: { x2: rayMoveX + launchInfo.dims * 0.5 + 167, y2: rayMoveY + launchInfo.dims + 159 }, ease: Power2.easeInOut }, 1.1 );
        timeline.to( ray6, 0.5, { attr: { y2: rayMoveY + launchInfo.dims * 0.5 + 80 }, ease: Power2.easeInOut }, 1.1 );
        timeline.to( ray7, 0.5, { attr: { x2: rayMoveX + launchInfo.dims + 242, y2: rayMoveY + launchInfo.dims * 0.5 + 80 }, ease: Power2.easeInOut }, 1.1 );
      } else if ( side === 'right' ) {
          timeline.to( ray0, 0.5, { attr: { x2: rayMoveX + launchInfo.dims - 318 }, ease: Power2.easeInOut }, 1.1 );
          // ray1 stays
          timeline.to( ray2, 0.5, { attr: { x2: rayMoveX + launchInfo.dims - 318, y2: rayMoveY + launchInfo.dims + 159 }, ease: Power2.easeInOut }, 1.1 );
          timeline.to( ray3, 0.5, { attr: { y2: rayMoveY + launchInfo.dims + 159 }, ease: Power2.easeInOut }, 1.1 );
          timeline.to( ray4, 0.5, { attr: { x2: rayMoveX + launchInfo.dims * 0.5 - 163 }, ease: Power2.easeInOut }, 1.1 );
          timeline.to( ray5, 0.5, { attr: { x2: rayMoveX + launchInfo.dims * 0.5 - 163, y2: rayMoveY + launchInfo.dims + 159 }, ease: Power2.easeInOut }, 1.1 );
          timeline.to( ray6, 0.5, { attr: { x2: rayMoveX + launchInfo.dims - 318, y2: rayMoveY + launchInfo.dims * 0.5 + 80 }, ease: Power2.easeInOut }, 1.1 );
          timeline.to( ray7, 0.5, { attr: { y2: rayMoveY + launchInfo.dims * 0.5 + 80 }, ease: Power2.easeInOut }, 1.1 );
      }
      
      // Return Beam to Ghost
      if (side === "left") {
        timeline.to( focusBeam, 0.5, { css: { x: "-100", y: "15", width: ".05em", height: ".05em", borderColor: "none", backgroundColor: "none" }, ease: Power2.easeOut }, 1.6 );
      } else if (side === "right") { 
        timeline.to( focusBeam, 0.5, { css: { x: "100", y: "15", width: ".05em", height: ".05em", borderColor: "none", backgroundColor: "none" }, ease: Power2.easeOut }, 1.6 );
      }

      // Return Beam Rays to Ghost
      timeline.to( ray0, .5, { attr: { x2: rayOriginX, y2: rayOriginY }, ease: Power2.easeOut }, 1.6 );
      timeline.to( ray1, .5, { attr: { x2: rayOriginX, y2: rayOriginY }, ease: Power2.easeOut }, 1.6 );
      timeline.to( ray2, .5, { attr: { x2: rayOriginX, y2: rayOriginY }, ease: Power2.easeOut }, 1.6 );
      timeline.to( ray3, .5, { attr: { x2: rayOriginX, y2: rayOriginY }, ease: Power2.easeOut }, 1.6 );
      timeline.to( ray4, .5, { attr: { x2: rayOriginX, y2: rayOriginY }, ease: Power2.easeOut }, 1.6 );
      timeline.to( ray5, .5, { attr: { x2: rayOriginX, y2: rayOriginY }, ease: Power2.easeOut }, 1.6 );
      timeline.to( ray6, .5, { attr: { x2: rayOriginX, y2: rayOriginY }, ease: Power2.easeOut }, 1.6 );
      timeline.to( ray7, .5, { attr: { x2: rayOriginX, y2: rayOriginY }, ease: Power2.easeOut }, 1.6 );

      // timeline.to( ray0, 0, { css: { opacity: 0 } }, 2.1 );
      // timeline.to( ray1, 0, { css: { opacity: 0 } }, 2.1 );
      // timeline.to( ray2, 0, { css: { opacity: 0 } }, 2.1 );
      // timeline.to( ray3, 0, { css: { opacity: 0 } }, 2.1 );
      // timeline.to( ray4, 0, { css: { opacity: 0 } }, 2.1 );
      // timeline.to( ray5, 0, { css: { opacity: 0 } }, 2.1 );
      // timeline.to( ray6, 0, { css: { opacity: 0 } }, 2.1 );
      // timeline.to( ray7, 0, { css: { opacity: 0 } }, 2.1 );

      // Reset Beam Position
      timeline.to(focusBeam, 0, { css: { x: "0", y: "0" } }, 2.1);

    } else {
      // Left Slots
      if (i < 5) {
        timeline.to(
          thisSlot,
          0.25,
          {
            css: { scaleX: 0, transformOrigin: "0% 50%" },
            ease: Power2.easeOut
          },
          0
        );

        // Right Slots
      } else {
        timeline.to(
          thisSlot,
          0.25,
          {
            css: { scaleX: 0, transformOrigin: "100% 50%" },
            ease: Power2.easeOut
          },
          0
        );
      }
    }
  }

  // Trigger TypeFocus
  timeline.call(trigger, [side, pos], null, 1.1);
}

// Item Details Animation
function itemDetailsSetup(index, focusItem, onItemClick, onShowDetails) {

  const invBar = document.querySelector(".inventory_bar");

  if (invBar) {
    inventoryDetailsSetup(invBar, index, focusItem, onItemClick, onShowDetails);
  } else {
    const typeFocus = document.querySelector(".type_focus");
    const typeHeader = document.querySelector(".type_focus_header");
    const storedBar = document.querySelector(".stored_bar");
    const focusSlot = document.querySelector(".slot.focus");
    const buckSlots = document.querySelectorAll(".bucket_slot");
    const clickedItem = document.querySelector("." + index);

    const side = typeFocus.classList.contains("left") ? "left" : "right";
    const shifts = getClickedItemOffsetDistance(clickedItem, ".type_focus_bar");

    // console.log( 'Shifts: ', shifts );

    // Move Clicked Slot to Front
    TweenMax.set(clickedItem, { css: { zIndex: 1 } });

    let timeline = new TimelineMax();

    // Loop Bucket Slots
    for (let i = 0; i < buckSlots.length; i++) {
      const slot = buckSlots[i];

      // Zoom Slot if Clicked
      if (slot.classList.contains(index)) {
        timeline.to(slot, 0.25, { css: { scale: 1 }, ease: Power2.easeOut }, 0);
      }

      // Retract Slot if !Clicked
      else {
        timeline.to(
          slot,
          0.5,
          { css: { scale: 0.6, autoAlpha: 0 }, ease: Power2.easeOut },
          0
        );
      }
    }

    // Shrink Main Slot if !Clicked
    if (!focusSlot.classList.contains(index)) {
      timeline.to(
        focusSlot,
        0.5,
        { css: { scale: 0.6, autoAlpha: 0 }, ease: Power2.easeOut },
        0
      );
    }

    // Retract Header
    timeline.to(
      typeHeader,
      0.5,
      { css: { scale: 0.6, autoAlpha: 0 }, ease: Power2.easeOut },
      0
    );

    // Retract Stored
    timeline.to(
      storedBar,
      0.5,
      { css: { scale: 0.6, autoAlpha: 0 }, ease: Power2.easeOut },
      0
    );

    // Slide Focus to Origin
    timeline.to(
      clickedItem,
      0.5,
      { css: { x: shifts[0], y: shifts[1] }, ease: Power2.easeOut },
      0
    );

    timeline.call(onItemClick, [index, focusItem], null, 0.5);
    timeline.call(showItemOverlay, [onShowDetails], null, 0.5);
  }
}

// Determines how far the clickedItem
// Returns the [ X, Y ]
function getClickedItemOffsetDistance(clickedItem, barClass) {
  const focusBar = document.querySelector(barClass);

  // console.log('FocusBar: ', focusBar);
  // console.log('ClickedItem: ', clickedItem);
  // console.log('BarClass', barClass );

  // Get type_focus_bar Origin
  const focusBarCoords = focusBar.getBoundingClientRect();
  const clickedItemCoords = clickedItem.getBoundingClientRect();

  // console.log('FocusBarCoords: ', focusBarCoords );
  // console.log('ClickedItemCoords: ', clickedItemCoords );

  // const leftShift = ( clickedItemCoords.x - focusBarCoords.x ) * -1;
  const leftShift = focusBarCoords.left - clickedItemCoords.left;
  const topShift = focusBarCoords.top - clickedItemCoords.top;

  return [leftShift, topShift];
}

function inventoryDetailsSetup(
  invBar,
  index,
  focusItem,
  onItemClick,
  onShowDetails
) {
  const invHeader = document.querySelector(".inventory_focus_header");
  const invButtons = document.querySelector(".inventory_button_container");
  const buckSlots = document.querySelectorAll(".inv_bucket_slot");
  const clickedItem = document.querySelector("." + index);
  // console.log(clickedItem);

  const shifts = getClickedItemOffsetDistance(clickedItem, ".scanner_bar");

  // Move Clicked Slot to Front
  TweenMax.set(clickedItem, { css: { zIndex: 1 } });

  let timeline = new TimelineMax();

  // Loop Bucket Slots
  for (let i = 0; i < buckSlots.length; i++) {
    const slot = buckSlots[i];

    // Zoom Slot if Clicked
    if (slot.classList.contains(index)) {
      timeline.to(slot, 0.25, { css: { scale: 1 }, ease: Power2.easeOut }, 0);
    }

    // Retract Slot if !Clicked
    else {
      timeline.to(
        slot,
        0.5,
        { css: { scale: 0.6, autoAlpha: 0 }, ease: Power2.easeOut },
        0
      );
    }
  }

  // Retract Header
  timeline.to(
    invHeader,
    0.5,
    { css: { scale: 0.6, autoAlpha: 0 }, ease: Power2.easeOut },
    0
  );

  // Retract Stored
  timeline.to(
    invButtons,
    0.5,
    { css: { scale: 0.6, autoAlpha: 0 }, ease: Power2.easeOut },
    0
  );

  // Slide Focus to Origin
  timeline.to(
    clickedItem,
    0.5,
    { css: { x: shifts[0], y: shifts[1] }, ease: Power2.easeOut },
    0
  );

  timeline.call(onItemClick, [index, focusItem], null, 0.5);
  timeline.call(showItemOverlay, [onShowDetails], null, 0.5);
}

function bottomSlotDetailsSetup(index, onShowDetails) {
  const scanSlot = document.querySelector(".item_details");
  const clickedSlot = document.querySelector("." + index);
  const typeFocus = document.querySelector(".type_focus");
  const storedBar = document.querySelector(".stored_bar");
  const invBar = document.querySelector(".inventory_bar");

  const menuBtns = document.querySelector(".menu_button_container");
  const towerOverlay = document.querySelector(".tower_overlay_bar");

  const shifts = getClickedItemOffsetDistance(
    clickedSlot,
    ".type_focus_scanner"
  );

  if (towerOverlay) {
    TweenMax.set(menuBtns, { autoAlpha: 0 });
    TweenMax.set(towerOverlay, { autoAlpha: 0 });
  }

  let timeline = new TimelineMax();

  // Hide Original Clicked Slot
  timeline.set(clickedSlot, { autoAlpha: 0 }, 0);

  // Retract Type Focus
  if (typeFocus) {
    timeline.to(
      typeFocus,
      0.5,
      { css: { scale: 0.6, autoAlpha: 0 }, ease: Power2.easeOut },
      0
    );
  }

  // Retract Stored Bar
  if (storedBar) {
    timeline.to(
      storedBar,
      0.5,
      { css: { scale: 0.6, autoAlpha: 0 }, ease: Power2.easeOut },
      0
    );
  }

  // Retract Inventory Bar
  if (invBar) {
    timeline.to(
      invBar,
      0.25,
      {
        css: { scale: 0.6, autoAlpha: 0, transformOrigin: "50% -97%" },
        ease: Power2.easeOut
      },
      0
    );
  }

  // Slide Scanner to Details Position
  timeline.to(
    scanSlot,
    0.5,
    {
      css: { x: shifts[0], y: shifts[1] - 3, width: 75, height: 75 },
      ease: Power2.easeOut
    },
    0
  );

  timeline.call(showItemOverlay, [onShowDetails], null, 0.5);
}

function removeStoredPriority(cb, payload) {
  const typeFocusBar = document.querySelector(".type_focus_bar");
  const storedBar = document.querySelector(".stored_bar");
  const storedFocus = document.querySelector(".stored_focus");
  const glow = document.querySelector(".glow");
  const ghost = document.querySelector(".ghost");
  const rings = document.querySelector(".rings");

  // Hide Open Stored Tab
  storedFocus
    ? TweenMax.to(storedFocus, 0.2, {
        css: { scaleY: 0, transformOrigin: "50% 0" },
        ease: Linear.easeNone
      })
    : null;

  // Remove Button Glow
  if (glow) {
    glow.classList.remove("glow");
  }

  let timeline = new TimelineMax();

  // Shift Priority Stored -> Type
  timeline.to(
    typeFocusBar,
    0.5,
    { css: { scale: 1, y: 0 }, ease: Power2.easeOut },
    0
  );
  timeline.to(storedBar, 0.5, { css: { y: 0 }, ease: Power2.easeOut }, 0);

  // Lower Ghost / Rings
  timeline.to(ghost, 0.5, { css: { y: 15 }, ease: Power2.easeOut }, 0);
  timeline.to(rings, 0.5, { css: { y: 15 }, ease: Power2.easeOut }, 0);

  typeFocusBar.classList.remove("shrunk");

  timeline.call(resetButtons, null, null, 0);
  timeline.call(
    cb,
    [payload[0], payload[1], payload[2], payload[3]],
    null,
    0.5
  );
}

function showItemOverlay(onShowDetails) {
  let ghost = document.querySelector(".ghost");
  let rings = document.querySelector(".rings");

  ghost.classList.remove("left");
  ghost.classList.remove("right");
  ghost.classList.remove("bottom");
  rings.classList.remove("left");
  rings.classList.remove("right");
  rings.classList.remove("bottom");
  ghost.classList.add("actions");

  // document.querySelector( '.lower_wrap' ).style.transform = 'translateY(-12%) scale(0)';

  onShowDetails("actions");
}

// Helpers

function getDamageIcon(type) {
  switch (type) {
    case 1:
      return "kinetic";

    case 2:
      return "arc";

    case 3:
      return "solar";

    case 4:
      return "void";
  }
}


// ------- Beam Rays -------

  export function moveRaysTo( rayGroupId, targetElement, shape, duration, ease ) {

    const targetCoordsArray = getRayTargetCoords( targetElement, shape );
    const origin = getBeamOrigin( document.querySelector( "#beamSVG" ) );
    const rayElementIds = getRayGroup( rayGroupId );

    animateRaysTo( rayElementIds, targetCoordsArray, origin, duration, ease );

  }

  function animateRaysTo( rayElementIds, targetCoordsArray, origin, duration, ease ) {

    const ray0 = document.querySelector( rayElementIds[0] );
    const ray1 = document.querySelector( rayElementIds[1] );
    const ray2 = document.querySelector( rayElementIds[2] );
    const ray3 = document.querySelector( rayElementIds[3] );
    const ray4 = document.querySelector( rayElementIds[4] );
    const ray5 = document.querySelector( rayElementIds[5] );
    const ray6 = document.querySelector( rayElementIds[6] );
    const ray7 = document.querySelector( rayElementIds[7] );

    let timeline = new TimelineMax();

    // Set Beam Ray Positions
    timeline.to( ray0, duration, { attr: { x1: origin[0], y1: origin[1], x2: targetCoordsArray[0][0], y2: targetCoordsArray[0][1] }, ease }, 0 );
    timeline.to( ray1, duration, { attr: { x1: origin[0], y1: origin[1], x2: targetCoordsArray[1][0], y2: targetCoordsArray[1][1] }, ease }, 0 );
    timeline.to( ray2, duration, { attr: { x1: origin[0], y1: origin[1], x2: targetCoordsArray[2][0], y2: targetCoordsArray[2][1] }, ease }, 0 );
    timeline.to( ray3, duration, { attr: { x1: origin[0], y1: origin[1], x2: targetCoordsArray[3][0], y2: targetCoordsArray[3][1] }, ease }, 0 );
    timeline.to( ray4, duration, { attr: { x1: origin[0], y1: origin[1], x2: targetCoordsArray[4][0], y2: targetCoordsArray[4][1] }, ease }, 0 );
    timeline.to( ray5, duration, { attr: { x1: origin[0], y1: origin[1], x2: targetCoordsArray[5][0], y2: targetCoordsArray[5][1] }, ease }, 0 );
    timeline.to( ray6, duration, { attr: { x1: origin[0], y1: origin[1], x2: targetCoordsArray[6][0], y2: targetCoordsArray[6][1] }, ease }, 0 );
    timeline.to( ray7, duration, { attr: { x1: origin[0], y1: origin[1], x2: targetCoordsArray[7][0], y2: targetCoordsArray[7][1] }, ease }, 0 );

  }

  function getRayGroup( rayGroupId ) {

    let rayElementIds = [];
    if ( rayGroupId === 1 ) {
      rayElementIds = [ "#beamRay0", "#beamRay1", "#beamRay2", "#beamRay3", "#beamRay4", "#beamRay5", "#beamRay6", "#beamRay7" ];
    } else if ( rayGroupId === 2 ) {
      rayElementIds = [ "#beamRay8", "#beamRay9", "#beamRay10", "#beamRay11", "#beamRay12", "#beamRay13", "#beamRay14", "#beamRay15" ];
    } else if ( rayGroupId === 3 ) {
      rayElementIds = [ "#beamRay16", "#beamRay17", "#beamRay18", "#beamRay19", "#beamRay20", "#beamRay21", "#beamRay22", "#beamRay23" ];
    }

    return rayElementIds;

  }

  function getRayTargetCoords( targetElement, shape ) {

    const targetRect = targetElement.getBoundingClientRect();

    const beamAngleType = getBeamAngleType( targetElement.className );
    const outerBeamCoords = getOuterBeamCoords( targetRect, beamAngleType );
    const offsetBeamCoords = getOffsetBeamCoords( targetRect, shape );
                                          
    const targetCoordsArray = outerBeamCoords.concat( offsetBeamCoords );

    return targetCoordsArray;

  }

  function getOffsetBeamCoords( rect, shape ) {

        switch( shape ) {
          case "square":
            return getSquareOffsetCoords( rect )
          case "tall":
            return getTallOffsetCoords( rect );
          case "wide":
            return getWideOffsetCoords( rect );
          default:
            console.log("Unknown Shape:");
            console.log( shape );
        }

  }

  function getSquareOffsetCoords( rect ) {

      const shift = svgWindowDifference();

      const xOffset = rect.x + rect.width * .5 + shift;
      const yOffset = rect.y + rect.height * .5;

      const midTop = [ xOffset, rect.y ];
      const midBottom = [ xOffset, rect.y + rect.height ];
      const midLeft = [ rect.x + shift, yOffset ];
      const midRight = [ rect.right + shift, yOffset ]; 

      return [ midTop, midBottom, midLeft, midRight ];
    
    }

    function getTallOffsetCoords( rect ) {

      const shift = svgWindowDifference();

      const oneThirdLeft = [ rect.x + shift, rect.y + rect.height * .25 ];
      const twoThirdLeft = [ rect.x + shift, rect.y + rect.height * .58 ];
      const oneThirdRight = [ rect.right + shift, rect.y + rect.height * .41 ];
      const twoThirdRight = [ rect.right + shift, rect.y + rect.height * .74 ];

      return [ oneThirdLeft, twoThirdLeft, oneThirdRight, twoThirdRight ];

    }

    function getWideOffsetCoords( rect ) {

      const shift = svgWindowDifference();
      const xShift = rect.x + shift;

      const oneThirdTop = [ xShift + rect.width * .25, rect.y ];
      const twoThirdTop = [ xShift + rect.width * .58, rect.y ];
      const oneThirdBottom = [ xShift + rect.width * .41, rect.bottom ];
      const twoThirdBottom = [ xShift + rect.width * .74, rect.bottom ];

      return [ oneThirdTop, twoThirdTop, oneThirdBottom, twoThirdBottom ];

    }

// -------------------------


function getMoveInfo(target) {
  let infoObj = {};

  const clickedRect = target.getBoundingClientRect();

  infoObj.start = [clickedRect.x, clickedRect.y];
  infoObj.dims = clickedRect.width;

  const destRect = getTarget("scan_focus_target");
  const endData = destRect.getBoundingClientRect();

  infoObj.end = [endData.left, endData.top];

  return infoObj;
}

function beamLaunchInfo(beam, destination) {
  let launchInfo = {};

  const data = beam.getBoundingClientRect();
  launchInfo.data = data;
  launchInfo.start = [data.left, data.top];

  const endData = destination.getBoundingClientRect();
  launchInfo.dims = endData.width;
  launchInfo.end = [endData.left, endData.top];

  return launchInfo;
}

export function getRandomBeamAttributes(num) {
  let beamAttributes = {
    stroke: [],
    strokeWidth: [],
    strokeDash: [],
    strokeDashOffset: [],
    opacity: 1
  };

  const strokeColors = ["#00B8FF", "#47d1ff", "#fff"];

  for (let i = 0; i < num; i++) {
    beamAttributes.stroke[i] = strokeColors[Math.floor(Math.random() * 3)];
    // beamAttributes.strokeWidth[i] = Math.floor(Math.random() * 3) + 1;
    beamAttributes.strokeWidth[i] = 1;
    beamAttributes.strokeDash[i] = Math.floor(Math.random() * 70) + 50;
    beamAttributes.strokeDashOffset[i] = Math.floor(Math.random()*2000) + 1200;
  }

  return beamAttributes;
}

// function beamMoveInfo( beam, destination ) {

//     let launchInfo = {};

//     const data = beam.getBoundingClientRect();

//     launchInfo.start = [ data.left, data.top ];
//     launchInfo.dims  = data.width;

//     const endData = destination.getBoundingClientRect();

//     launchInfo.end = [ endData.left, endData.top ];

//     return launchInfo

// }

export function buildBeam( targetEl, side ) {

  const angleType = getBeamAngleType( targetEl.className );
  const outerCoords = getOuterBeamCoords( targetEl.getBoundingClientRect(), angleType );
  let beamPath;

  if ( side === "front" ) {
    beamPath = getSquareBeamPath( outerCoords );
  } else {
    const origin = getBeamOrigin( document.querySelector( "#beamSVG" ), side );
    beamPath = getBeamPath( origin, outerCoords );
  }
  // const origin = getBeamOrigin( document.querySelector( "#beamSVG" ), side );
  // beamPath = getBeamPath( origin, outerCoords );

  return beamPath;

}

function getSquareBeamPath( outerCoords ) {

  const point1 = `M${ outerCoords[0][0] } ${ outerCoords[0][1] } `;
  const point2 = `L${ outerCoords[1][0] } ${ outerCoords[1][1] } `;
  const point3 = `L${ outerCoords[2][0] } ${ outerCoords[2][1] } `;
  const point4 = `L${ outerCoords[3][0] } ${ outerCoords[3][1] } Z`;

  const path = point1 + point2 + point3 + point4;

  return path;

}

// Returns an SVG Path string
function getBeamPath( origin, outerCoords ) {

  const point1 = `M${ origin[0] } ${ origin[1] } `;
  const point2 = `L${ outerCoords[0][0] } ${ outerCoords[0][1] } `;
  const point3 = `L${ outerCoords[1][0] } ${ outerCoords[1][1] } `;
  let point4;
  if ( outerCoords.length === 4 ) {
    point4 = `L${ outerCoords[2][0] } ${ outerCoords[2][1] } L${ outerCoords[3][0] } ${ outerCoords[3][1] } Z` ;
  } else {
    point4 =`L${ outerCoords[2][0] } ${ outerCoords[2][1] } Z`;
  }
  
  const path = point1 + point2 + point3 + point4;

  return path;

}

// Returns the [ x, y ] origin for the beam path
function getBeamOrigin( beamSVG, side ) {

  const svgRect = beamSVG.getBoundingClientRect();
  let shift = svgWindowDifference();

  if ( side === "left" ) {
    shift = shift - 100;
    return [ svgRect.x + shift + svgRect.width * .5, svgRect.y + 15 + svgRect.height * .5 ];
  }
  else if ( side === "right" ) {
    shift = shift + 100;
    return [ svgRect.x + shift + svgRect.width * .5, svgRect.y + 15 + svgRect.height * .5 ];
  } else if ( side === "up" ) {
    return [ svgRect.x + shift + svgRect.width * .5, svgRect.y + svgRect.height * .5 ];
  } else {
    return [ svgRect.x + shift + svgRect.width * .5, svgRect.y + svgRect.height * .5 ];
  }

  // return [ svgRect.x + shift + svgRect.width * .5, svgRect.y + svgRect.height * .5 ];

}

// Returns the 3 points of contact for the 
// beam path as an array of [ x, y ] Coords
function getOuterBeamCoords( rect, angleCase ) {
// console.log('AngleCase: ' + angleCase );
  switch( angleCase ) {

    case 1:
      // console.log('Returns 1');
      return [ getCorner( rect, 3 ), 
               getCorner( rect, 1 ), 
               getCorner( rect, 2 ) ];
    case 2:
      // console.log('Returns 2');
      return [ getCorner( rect, 4 ), 
               getCorner( rect, 2 ), 
               getCorner( rect, 1 ) ];
    case 3:
      // console.log('Returns 3');
      return [ getCorner( rect, 4 ), 
               getCorner( rect, 3 ), 
               getCorner( rect, 1 ) ];
    case 4:
      // console.log('Returns 4');
      return [ getCorner( rect, 3 ), 
               getCorner( rect, 4 ), 
               getCorner( rect, 2 ) ];
    case 5:
      // console.log('Returns 5');
      return [ getCorner( rect, 3 ),
               getCorner( rect, 1 ),
               getCorner( rect, 2 ),
               getCorner( rect, 4 ) ];
    case 6:
      // console.log('Returns 6');
      return [ getCorner( rect, 1 ),
               getCorner( rect, 3 ),
               getCorner( rect, 4 ),
               getCorner( rect, 2 ) ];
    case 7:
      // console.log('Returns 7');
      return [ getCorner( rect, 3 ),
               getCorner( rect, 1 ),
               getCorner( rect, 2 ),
               getCorner( rect, 2 ) ];
    case 8:
      // console.log('Returns 8');
      return [ getCorner( rect, 2 ),
               getCorner( rect, 1 ),
               getCorner( rect, 3 ),
               getCorner( rect, 4 ) ];           
    case 9:
      // console.log('Returns 9');
      return [ getCorner( rect, 1 ),
               getCorner( rect, 2 ),
               getCorner( rect, 4 ),
               getCorner( rect, 3 ) ]; 
    case 10:
      // console.log('Returns 10');
      return [ getCorner( rect, 4 ),
               getCorner( rect, 2 ),
               getCorner( rect, 1 ),
               getCorner( rect, 3 ) ]; 
   default:
      console.log("Unknown AngleCase");

  }

}

function svgWindowDifference() {

  const window = document.querySelector( ".background" );
  const svg = document.querySelector( "#beamSVG" );

  const windowRect = window.getBoundingClientRect();
  const svgRect = svg.getBoundingClientRect();

  const difference = windowRect.left - svgRect.left;

  return difference;
}

// Returns the [ x, y ] coord of which corner to use
function getCorner( rect, num ) {
// console.log('Corner')
// console.log('Case ' + num );
  const shift = svgWindowDifference();

  switch( num ) {
    case 1:
      return [ rect.x + shift, rect.y ];
    case 2:
      return [ rect.right + shift, rect.y ];
    case 3:
      return [ rect.x + shift, rect.bottom ];
    case 4:
      return [ rect.right + shift, rect.bottom ];
    default:
      console.log("Unknown Corner Number");
  }

}

// Returns the case number of which angle to use
function getBeamAngleType( elClassName ) {

  // console.log("Class Name:");
  // console.log(elClassName);

  let num;
  if ( elClassName === 'beamTarget' ) {
    num = 1
  } else if ( elClassName === 'scan_focus_target' ) {
    num = 1;
  } else if ( elClassName === 'scan_focus_target_right' ) {
    num = 2;
  } else if ( elClassName === 'scanner_bucket_right' ) {
    num = 1
  } else if ( elClassName === 'scanner_bucket' ) {
    num = 2
  } else if ( elClassName === 'scan_beam_thin_target' ) {
    num = 1
  } else if ( elClassName === 'scan_beam_thin_target_right' ) {
    num = 2
  } else if ( elClassName === 'slot left1 ' ) {
     num = 1;
  } else if ( elClassName === 'slot left2 ' ) {
     num = 1;
  } else if ( elClassName === 'slot left6 ' ) {
     num = 1;
  } else if ( elClassName === 'slot right1 ' ) {
     num = 2;
  } else if ( elClassName === 'slot right2 ' ) {
     num = 2;
  } else if ( elClassName === 'slot right3 ' ) {
     num = 2;
  } else if ( elClassName === 'slot right8 ' ) {
     num = 2;
  } else if ( elClassName === 'slot left3 ' ) {
    num = 3;
  } else if ( elClassName === 'slot left4 ' ) {
     num = 3;
  } else if ( elClassName === 'slot left7 ' ) {
     num = 3;
  } else if ( elClassName === 'slot right4 ' ) {
     num = 4;
  } else if ( elClassName === 'slot right5 ' ) {
     num = 4;
  } else if ( elClassName === 'slot right6 ' ) {
     num = 4;
  } else if ( elClassName === 'slot right9 ' ) {
     num = 4;
  } else if ( elClassName === 'app_name_text' ) {
    num = 5;
 } else if ( elClassName === 'left_title_target' ) {
  num = 7; 
 } else if ( elClassName === 'right_title_target' ) {
  num = 5;
 } else if ( elClassName === 'left_desc_target' ) {
  num = 5;
 } else if ( elClassName === 'right_desc_target' ) {
  num = 5;
 } else if ( elClassName === 'app_desc_text' ) {
  num = 5;
 } else if ( elClassName === 'beamTargetFull' ) {
  num = 5;
 } else if ( elClassName === 'beamTargetFullLeft' ) {
   num = 10;
 } else if ( elClassName === 'title_beam_target_wrap') {
   num = 5;
 } else if ( elClassName === 'desc_beam_target_wrap') {
  num = 5;
 } else if ( elClassName === 'char_back') {
  num = 5;
 } else if ( elClassName === 'interface') {
  num = 5;
 } else if ( elClassName === 'scanner_emblem') {
  num = 5;
 } else if ( elClassName === 'scanner_emblem_left') {
  num = 8;
 } else if ( elClassName === 'scanner_emblem_right') {
  num = 9;
 } else if ( elClassName === 'scanner_emblem_container') {
  num = 8;
 } else if ( elClassName === 'scanner_emblem_container_left') {
  num = 8;
 } else if ( elClassName === 'scanner_emblem_container_right') {
  num = 9;
 } else if ( elClassName === 'scanner_char_back') {
  num = 8;
 } else if ( elClassName === 'scanner_char_back_left') {
  num = 8;
 } else if ( elClassName === 'scanner_char_back_right') {
  num = 9;
 } else if ( elClassName === 'scanner_char_back_left_up') {
  num = 8;
 } else if ( elClassName === 'scanner_char_back_right_up') {
  num = 9;
 } else if ( elClassName === 'scanner_interface') {
  num = 8;
 } else if ( elClassName === 'scanner_bar_launch_left') {
  num = 8;
 } else if ( elClassName === 'scanner_bar_launch_right') {
  num = 9;
 } else if ( elClassName === 'scanner') {
  num = 8;
 } else if ( elClassName === 'scanner_left_slots') {
  num = 8;
 } else if ( elClassName === 'scanner_left_slots_thin') {
  num = 8;
 } else if ( elClassName === 'scanner_left_slots_back') {
  num = 8;
 } else if ( elClassName === 'scanner_left_slots_back_thin') {
  num = 8;
 } else if ( elClassName === 'scanner_right_slots') {
  num = 9;
 } else if ( elClassName === 'scanner_right_slots_thin') {
  num = 9;
 } else if ( elClassName === 'scanner_right_slots_back') {
  num = 9;
 } else if ( elClassName === 'scanner_right_slots_back_thin') {
  num = 9;
 } else {
     console.log("Unknown Beam Angle Class");
  }

  // console.log('NUMBER:');
  // console.log(num);
  return num;


}

function getTarget(index) {
  return document.querySelector("#" + index);
}

export default Slot_Comp;
