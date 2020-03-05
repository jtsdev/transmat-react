import React from "react";
import { TweenMax, Power2, Linear, TimelineLite, TimelineMax } from "gsap";

class StoredButtons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    launchButtons();
  }

  handleClick(e, subtype) {
    e.stopPropagation();

    let glow = document.querySelector(".glow");
    if (glow) {
      glow.classList.remove("glow");
    }

    if (subtype === this.props.subFocus) {
      let eyeCoords = getEyeCoordsAndButtonSide(e.target.id);
      removeStoredPriority(resetButtons);
      this.props.clickCall("none");
      changeStoredFocus(true, eyeCoords);
    } else {
      // Shift priority to Stored if it's not already
      if (document.querySelector(".shrunk")) {
        focusButton(e.target);
      } else {
        makeStoredPriority(focusButton, e.target);
      }

      this.props.clickCall(subtype);
    }
  }

  render() {
    const slotSubtypes = getSlotItemType(this.props.focus, "subtypes");
    const total = slotSubtypes.length,
      sideAndNum = sliceFocus(this.props.focus);

    let count = 0,
      side = sideAndNum[0],
      payload = [];

    if (slotSubtypes[0] !== "Clan") {
      for (let i = 0; i < total; i++) {
        let subtype = slotSubtypes[i];
        let row = i < 3 ? "top" : "bottom";

        if (total < 4) {
          row = "bottom";
        }

        payload.push(
          <div
            className={"button_scale " + side}
            key={"button_scale " + subtype}
          >
            <button
              id={replaceSpace(subtype) + "_button"}
              className={"stored_button " + row}
              key={subtype}
              onClick={e => this.handleClick(e, subtype)}
            ></button>
          </div>
        );

        count++;
      }
    }

    return <div className="stored_button_container">{payload}</div>;
  }
}

// Helpers

function replaceSpace(subtype) {
  return subtype.replace(/ /g, "_");
}

export function getSlotItemType(focus, type) {
  // Parse the focused slot's ID of format: 'side#'
  // Returns array [ side, # ]
  const focusParams = sliceFocus(focus);

  // Retrieve type/subtype object for given side
  const uiSide = typeRouter[focusParams[0]];

  // Retrieve type/subtype object for given slot #
  const uiSlot = uiSide[focusParams[1]];

  return uiSlot[type];
}

const typeRouter = {
  left: {
    1: {
      type: "Kinetic",
      subtypes: [
        "Auto Rifles",
        "Hand Cannons",
        "Pulse Rifles",
        "Scout Rifles",
        "Sidearms",
        "Submachine Guns"
      ]
    },
    2: {
      type: "Energy",
      subtypes: [
        "Auto Rifles",
        "Hand Cannons",
        "Pulse Rifles",
        "Scout Rifles",
        "Sidearms",
        "Submachine Guns"
      ]
    },
    3: {
      type: "Power",
      subtypes: [
        "Fusion Rifles",
        "Shotguns",
        "Sniper Rifles",
        "Grenade Launchers",
        "Rocket Launchers",
        "Swords"
      ]
    },
    4: {
      type: "Ghost",
      subtypes: ["Ghost Shells"]
    },
    6: {
      type: "Ship",
      subtypes: ["Ships"]
    },
    7: {
      type: "Sparrow",
      subtypes: ["Sparrows"]
    },
    8: {
      type: "Horn",
      subtypes: ["Horns"]
    }
  },

  right: {
    1: {
      type: "Head",
      subtypes: ["Hunter", "Warlock", "Titan"]
    },
    2: {
      type: "Arms",
      subtypes: ["Hunter", "Warlock", "Titan"]
    },
    3: {
      type: "Chest",
      subtypes: ["Hunter", "Warlock", "Titan"]
    },
    4: {
      type: "Legs",
      subtypes: ["Hunter", "Warlock", "Titan"]
    },
    5: {
      type: "Class Armor",
      subtypes: ["Hunter", "Warlock", "Titan"]
    },
    6: {
      type: "Clan",
      subtypes: ["Clan"]
    },
    7: {
      type: "Shader",
      subtypes: ["Shaders"]
    },
    8: {
      type: "Emblem",
      subtypes: ["Emblems"]
    },
    9: {
      type: "Emote",
      subtypes: ["Emotes"]
    }
  }
};

function sliceFocus(focus) {
  const length = focus.length;

  const side = focus.slice(0, length - 1);
  const pos = focus[length - 1].slice();

  return [side, pos];
}

function getEyeCoordsAndButtonSide(id) {
  switch (id) {
    case "Auto_Rifles_button":
      return [1, 0, "left"];
    case "Hand_Cannons_button":
      return [1, 1, "mid"];
    case "Pulse_Rifles_button":
      return [1, 2, "right"];

    case "Scout_Rifles_button":
      return [1, 0, "left"];
    case "Sidearms_button":
      return [1, 1, "mid"];
    case "Submachine_Guns_button":
      return [1, 2, "right"];

    case "Fusion_Rifles_button":
      return [1, 0, "left"];
    case "Shotguns_button":
      return [1, 1, "mid"];
    case "Sniper_Rifles_button":
      return [1, 2, "right"];
    case "Grenade_Launchers_button":
      return [1, 0, "left"];
    case "Rocket_Launchers_button":
      return [1, 1, "mid"];
    case "Swords_button":
      return [1, 2, "right"];

    case "Ghost_Shells_button":
      return [1, 1, "mid"];

    case "Hunter_button":
      return [-1, -2, "left"];
    case "Warlock_button":
      return [-1, -1, "mid"];
    case "Titan_button":
      return [-1, 0, "right"];

    case "Ships_button":
      return [1, 1, "mid"];
    case "Sparrows_button":
      return [1, 1, "mid"];
    case "Horns_button":
      return [1, 1, "mid"];

    case "Shaders_button":
      return [-1, -1, "mid"];
    case "Emblems_button":
      return [-1, -1, "mid"];
    case "Emotes_button":
      return [-1, -1, "mid"];

    default:
      console.log("No Id Match for: ", id);
  }
}

function getScanCoords(eyeCoords) {
  const start = eyeCoords[1];
  const side = eyeCoords[2];

  if (start === 0) {
    return side === "left" ? [2, 1] : [-2, 1];
  } else if (Math.abs(start) === 1) {
    return [start, 2];
  } else {
    return [0, 1];
  }
}

// Animations

function switchRows(top, btm) {
  for (let i = 0; i < top.length; i++) {
    top[i].classList.remove("top");
    btm[i].classList.remove("bottom");

    top[i].classList.add("bottom");
    btm[i].classList.add("top");
  }
}

function launchButtons() {
  const storedBtns = document.querySelectorAll(".button_scale");

  const incr = 0.025;

  let timeline = new TimelineMax();

  for (let i = 0; i < storedBtns.length; i++) {
    timeline.to(
      storedBtns[i],
      0.5,
      { css: { scale: 1 }, ease: Power2.easeInOut },
      0.5 + incr * i
    );
  }
}

function focusButton(clickTarget) {
  const storedBtns = document.querySelectorAll(".button_scale");
  const ghostEye = document.querySelector(".ghost_eye");
  const storedFocus = document.querySelector(".stored_focus");

  storedFocus
    ? TweenMax.to(storedFocus, 0.2, {
        css: { scaleY: 0, transformOrigin: "50% 0" },
        ease: Linear.easeNone
      })
    : null;

  let timeline = new TimelineMax();

  let num = storedBtns.length;
  let row = clickTarget.classList[1];

  let eyeCoords = getEyeCoordsAndButtonSide(clickTarget.id);
  let eyeStart = eyeCoords[0];
  let eyeEnd = eyeCoords[1];

  // Eye Scans
  timeline.to(
    ghostEye,
    0.1,
    { css: { x: eyeStart, y: 1 }, ease: Power2.easeOut },
    0
  );

  timeline.set(storedBtns, { autoAlpha: 0.6 }, 0);

  if (row === "top" && num > 3) {
    let topBtns = document.querySelectorAll(".stored_button.top");
    let btmBtns = document.querySelectorAll(".stored_button.bottom");

    timeline.to(
      storedBtns,
      0.1,
      { css: { scale: 0.8 }, ease: Power2.easeInOut },
      0.1
    );

    timeline.to(
      topBtns,
      0.25,
      { css: { top: "53%" }, ease: Power2.easeIn },
      0.1
    );

    timeline.to(
      btmBtns,
      0.25,
      { css: { top: "40%" }, ease: Power2.easeOut },
      0.1
    );

    timeline.to(
      btmBtns[0].parentNode,
      0.25,
      { css: { scale: 0.7 }, ease: Power2.easeOut },
      0.1
    );
    timeline.to(
      btmBtns[1].parentNode,
      0.25,
      { css: { scale: 0.7 }, ease: Power2.easeOut },
      0.1
    );
    timeline.to(
      btmBtns[2].parentNode,
      0.25,
      { css: { scale: 0.7 }, ease: Power2.easeOut },
      0.1
    );

    timeline.to(
      btmBtns[0].parentNode,
      0.25,
      { css: { scale: 0.8 }, ease: Power2.easeOut },
      0.35
    );
    timeline.to(
      btmBtns[1].parentNode,
      0.25,
      { css: { scale: 0.8 }, ease: Power2.easeOut },
      0.35
    );
    timeline.to(
      btmBtns[2].parentNode,
      0.25,
      { css: { scale: 0.8 }, ease: Power2.easeOut },
      0.35
    );

    for (let i = 0; i < storedBtns.length; i++) {
      if (storedBtns[i].children[0] === clickTarget) {
        timeline.to(
          ghostEye,
          0.2,
          { css: { x: eyeEnd }, ease: Power2.easeOut },
          0.2
        );
        timeline.set(storedBtns[i], { autoAlpha: 1 }, 0.01);
        timeline.to(
          storedBtns[i],
          0.5,
          { css: { scale: 1 }, ease: Power2.easeInOut },
          0.35
        );
        storedBtns[i].children[0].classList.add("glow");
      }
    }

    timeline.call(switchRows, [topBtns, btmBtns], null, 0.85);
    timeline.call(changeStoredFocus, [false, eyeCoords], null, 0.85);
  } else {
    for (let i = 0; i < storedBtns.length; i++) {
      if (storedBtns[i].children[0] === clickTarget) {
        timeline.to(
          ghostEye,
          0.2,
          { css: { x: eyeEnd }, ease: Power2.easeOut },
          0
        );
        timeline.set(storedBtns[i], { autoAlpha: 1 }, 0);
        timeline.to(
          storedBtns[i],
          0.5,
          { css: { scale: 1 }, ease: Power2.easeOut },
          0
        );
        storedBtns[i].children[0].classList.add("glow");
      } else {
        timeline.to(
          storedBtns[i],
          0.5,
          { css: { scale: 0.8 }, ease: Power2.easeOut },
          0
        );
      }
    }

    timeline.call(changeStoredFocus, [false, eyeCoords], null, 0.6);
  }
}

export function resetButtons() {
  const storedBtns = document.querySelectorAll(".button_scale");
  const ghostEye = document.querySelector(".ghost_eye");

  let timeline = new TimelineMax();

  timeline.to(ghostEye, 0.5, { css: { x: 0, y: 0 }, ease: Power2.easeOut }, 0);

  for (let i = 0; i < storedBtns.length; i++) {
    timeline.to(
      storedBtns[i],
      0.5,
      { css: { scale: 1, autoAlpha: 1 }, ease: Power2.easeInOut },
      0
    );
  }
}

function changeStoredFocus(doHide, eyeCoords) {
  const storedFocus = document.querySelector(".stored_focus");
  const ghostEye = document.querySelector(".ghost_eye");

  let transOrigin;

  switch (eyeCoords[2]) {
    case "left":
      transOrigin = "0 0";
      break;
    case "mid":
      transOrigin = "50% 0";
      break;
    case "right":
      transOrigin = "100% 0";
      break;
  }

  let timeline = new TimelineMax();

  if (storedFocus) {
    if (doHide) {
      timeline.to(
        storedFocus,
        0.5,
        {
          css: { scaleX: 0.33, scaleY: 0, transformOrigin: transOrigin },
          ease: Power2.easeOut
        },
        0
      );
    } else {
      let oldOrigin;
      let coords = getScanCoords(eyeCoords);

      switch (eyeCoords[0]) {
        case 1:
          oldOrigin = "50% 0";
          break;
        case 2:
          oldOrigin = "100% 0";
          break;
        case -1:
          oldOrigin = "50% 0";
          break;
        case -2:
          oldOrigin = "0 0";
          break;
        case 0:
          oldOrigin = "0 0";
          break;
      }

      // timeline.to( storedFocus, .25, { css: { scaleX: .33, scaleY: 0, transformOrigin: oldOrigin   }, ease: Power2.easeOut },  0 );
      timeline.fromTo(
        storedFocus,
        0.5,
        { css: { scaleX: 0, scaleY: 0, transformOrigin: transOrigin } },
        { css: { scaleX: 1, scaleY: 1 }, ease: Power2.easeOut },
        0
      );
      timeline.to(
        ghostEye,
        0.5,
        { css: { x: coords[0], y: coords[1] }, ease: Power2.easeOut },
        0
      );
      timeline.to(
        ghostEye,
        0.25,
        { css: { x: 0, y: 0 }, ease: Power2.easeOut },
        0.5
      );
    }
  }
}

function makeStoredPriority(cb, target) {
  const typeFocusBar = document.querySelector(".type_focus_bar");
  const storedBar = document.querySelector(".stored_bar");
  const ghost = document.querySelector(".ghost");
  const rings = document.querySelector(".rings");

  let timeline = new TimelineMax();

  // Shift Priority Type -> Stored
  timeline.to(
    typeFocusBar,
    0.5,
    { css: { scale: 0.8, y: -55 }, ease: Power2.easeOut },
    0
  );
  timeline.to(storedBar, 0.5, { css: { y: -50 }, ease: Power2.easeOut }, 0);

  // Raise Ghost / Rings
  timeline.to(ghost, 0.5, { css: { y: -35 }, ease: Power2.easeOut }, 0);
  timeline.to(rings, 0.5, { css: { y: -35 }, ease: Power2.easeOut }, 0);

  typeFocusBar.classList.add("shrunk");

  timeline.call(cb, [target], null, 0);
}

function removeStoredPriority(cb) {
  const typeFocusBar = document.querySelector(".type_focus_bar");
  const storedBar = document.querySelector(".stored_bar");
  const ghost = document.querySelector(".ghost");
  const rings = document.querySelector(".rings");

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

  timeline.call(cb, null, null, 0);
}

export default StoredButtons;
