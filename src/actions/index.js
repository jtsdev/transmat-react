import { TweenMax, Power2 } from "gsap";

import { unfocusInventoryBar } from "../features/InventoryBar/inventory_bar";
import { hideEmblems } from "../components/emblem";

export const HIDE_OVERLAYS = "HIDE_OVERLAYS",
  SHOW_ABOUT = "SHOW_ABOUT",
  SHOW_SETTINGS = "SHOW_SETTINGS",
  SHOW_LOGOUT = "SHOW_LOGOUT",
  HIDE_RINGS = "HIDE_RINGS",
  LOGIN_RINGS = "LOGIN_RINGS",
  OVERLAYS_RINGS = "OVERLAYS_RINGS",
  SUBTYPE_RINGS = "SUBTYPE_RINGS",
  SUBTYPE_OPT_RINGS = "SUBTYPE_OPT_RINGS",
  SUBTYPE_FOCUS_RINGS = "SUBTYPE_FOCUS_RINGS",
  SUBTYPE_FOCUS_OPT_RINGS = "SUBTYPE_FOCUS_OPT_RINGS",
  ITEM_ACTIONS_RINGS = "ITEM_ACTIONS_RINGS",
  ITEM_ACTIONS_OPT_RINGS = "ITEM_ACTIONS_OPT_RINGS",
  HIDE_INTERFACE = "HIDE_INTERFACE",
  DEFAULT_INTERFACE = "DEFAULT_INTERFACE",
  EMBLEM_INTERFACE = "EMBLEM_INTERFACE",
  SWITCH_TO_FRONT = "SWITCH_TO_FRONT",
  SWITCH_TO_BACK = "SWITCH_TO_BACK",
  SUBCLASS_FOCUS = "SUBCLASS_FOCUS",
  TYPE_FOCUS = "TYPE_FOCUS",
  GHOST_LEFT = "GHOST_LEFT",
  GHOST_RIGHT = "GHOST_RIGHT",
  GHOST_CENTER = "GHOST_CENTER",
  GHOST_ACTIONS = "GHOST_ACTIONS",
  INVENTORY_FOCUS = "INVENTORY_FOCUS",
  STORED_FOCUS = "STORED_FOCUS",
  ITEM_FOCUS = "ITEM_FOCUS",
  ITEM_DETAILS = "ITEM_DETAILS",
  ITEM_ACTIONS = "ITEM_ACTIONS",
  ITEM_EQUIP = "ITEM_EQUIP",
  ITEM_TRANSFER = "ITEM_TRANSFER",
  SHOW_DETAILS = "SHOW_DETAILS",
  SHOW_ACTIONS = "SHOW_ACTIONS",
  SET_CHARACTERS = "SET_CHARACTERS",
  CHARACTER_0 = "CHARACTER_0",
  CHARACTER_1 = "CHARACTER_1",
  CHARACTER_2 = "CHARACTER_2",
  SET_SUBCLASS = "SET_SUBCLASS",
  ITEMS_READY = "ITEMS_READY",
  ITEM_REFRESH = "ITEM_REFRESH",
  UPDATE_TOGGLE = "UPDATE_TOGGLE",
  INTERFACE_LAUNCHED = "INTERFACE_LAUNCHED",
  LOGIN_ATTEMPT = "LOGIN_ATTEMPT",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  SHOW_PROGRESS = "SHOW_PROGRESS",
  SHOW_LOADOUTS = "SHOW_LOADOUTS",
  SHOW_TOWER = "SHOW_TOWER";

// Items Async Ready

export const itemsReady = () => {
  return {
    type: ITEMS_READY
  };
};

export const itemRefresh = () => {
  return {
    type: ITEM_REFRESH
  };
};

export const updateToggle = oldState => {
  const payload = !oldState;

  return {
    type: UPDATE_TOGGLE,
    payload: payload
  };
};

export const interfaceLaunched = () => {
  return {
    type: INTERFACE_LAUNCHED
  };
};

// Ghost

export const handleGhostClick = (rings, interfaceType) => {
  if (interfaceType === "type_focus") {
    return { type: SUBTYPE_RINGS };
  } else if (interfaceType === "default") {
    return { type: OVERLAYS_RINGS };
  } // hide Interface, show Rings
  else if (interfaceType === "emblem") {
    return { type: HIDE_RINGS };
  } // show Interface, hide Rings
  else {
    if (rings === "subtype") {
      return { type: SUBTYPE_OPT_RINGS };
    } else if (rings === "subtype_overlays") {
      return { type: SUBTYPE_RINGS };
    } else if (rings === "subtype_focus") {
      return { type: SUBTYPE_FOCUS_OPT_RINGS };
    } else if (rings === "subtype_focus_overlays") {
      return { type: SUBTYPE_FOCUS_RINGS };
    } else if (rings === "item_actions") {
      return { type: ITEM_ACTIONS_OPT_RINGS };
    } else if (rings === "item_actions_overlays") {
      return { type: ITEM_ACTIONS_RINGS };
    }
  }
};

// Item

export const handleItemClick = (slotIndex, item) => {
  return {
    type: ITEM_FOCUS,
    target: slotIndex,
    item: item
  };
};

// Scanner

export const handleScannerClick = toState => {
  switch (toState) {
    case "actions":
      return { type: ITEM_ACTIONS };

    case "details":
      return { type: ITEM_DETAILS };

    case "equip":
      return { type: ITEM_EQUIP };

    case "transfer":
      return { type: ITEM_TRANSFER };
    default:
      console.log("Unknown Case");
  }
};

export const handleShowDetails = detailType => {
  if (detailType === "actions") {
    return { type: SHOW_ACTIONS };
  } else {
    return { type: SHOW_DETAILS };
  }
};

// Slot

export const handleSlotClick = (slot, pos) => {
  const focus_target = slot + pos;

  return {
    type: TYPE_FOCUS,
    side: slot,
    target: focus_target
  };
};

export const handleSubclassClick = target => {
  return {
    type: SUBCLASS_FOCUS,
    target: target
  };
};

export const handleSwitcher = index => {
  let actType = index === "left5" ? SWITCH_TO_BACK : SWITCH_TO_FRONT;

  return {
    type: actType
  };
};

// Inventory

export const handleInventoryClick = invType => {
  return {
    type: INVENTORY_FOCUS,
    target: invType
  };
};

// Stored

export const handleStoredClick = subtype => {
  return {
    type: STORED_FOCUS,
    target: subtype
  };
};

// Emblem

export const characterFocus = index => {
  switch (index) {
    case 0:
      return { type: CHARACTER_0 };

    case 1:
      return { type: CHARACTER_1 };

    case 2:
      return { type: CHARACTER_2 };

    default:
      return { action: CHARACTER_0 };
  }
};

// Interface

export const setCharacters = characters => {
  return {
    type: SET_CHARACTERS,
    payload: characters
  };
};

export const setSubclassFocus = subclass => {
  return {
    type: SET_SUBCLASS,
    payload: subclass
  };
};

// Background

export const backgroundClick = switcher => {
  let actType = switcher === "back" ? SWITCH_TO_BACK : SWITCH_TO_FRONT;

  if (document.querySelector(".emblem.lower")) {
    hideEmblems();
    document.querySelector(".emblem.lower").classList.remove("lower");
  } else if (document.querySelector(".lower_wrap")) {
    document.querySelector(".lower_wrap").style.transform = "scale(1)";

    const ghost = document.querySelector(".ghost");
    const ghostEye = document.querySelector(".ghost_eye");
    const rings = document.querySelector(".rings");
    const storedBar = document.querySelector(".stored_bar");

    ghost.classList.remove("left");
    ghost.classList.remove("right");
    ghost.classList.remove("actions");

    TweenMax.to(ghost, 0.5, {
      css: { scale: 1, x: 0, y: 0 },
      ease: Power2.easeOut
    });
    TweenMax.to(ghostEye, 0.5, { css: { x: 0, y: 0 }, ease: Power2.easeOut });

    if (rings) {
      TweenMax.to(rings, 0.5, {
        css: { scale: 0, x: 0, y: 0, autoAlpha: 0 },
        ease: Power2.easeOut
      });
    }

    if (storedBar) {
      TweenMax.set(storedBar, { css: { y: 0 } });
    }

    document.querySelector(".lower_wrap").style.marginTop = "0";
  }

  if (
    document.querySelector(".glow") &&
    !document.querySelector(".button_scale")
  ) {
    unfocusInventoryBar();
  }

  return {
    type: actType
  };
};

// Overlays

export const hideOverlays = closeType => {
  if (closeType === "default") {
    document.querySelector(".lower_wrap").style.transform =
      "translateY(0) scale(1)";

    return { type: DEFAULT_INTERFACE };
  }

  return {
    type: HIDE_OVERLAYS
  };
};

export const showAbout = () => {
  return {
    type: SHOW_ABOUT
  };
};

export const showSettings = () => {
  return {
    type: SHOW_SETTINGS
  };
};

export const showLogout = () => {
  return {
    type: SHOW_LOGOUT
  };
};

export const showProgress = () => {
  return {
    type: SHOW_PROGRESS
  };
};

export const showLoadouts = () => {
  return {
    type: SHOW_LOADOUTS
  };
};

export const showTower = () => {
  return {
    type: SHOW_TOWER
  };
};

export const centerGhost = () => {
  return {
    type: GHOST_CENTER
  };
};

// Login

export const handleLoginClick = () => {
  return {
    type: HIDE_RINGS
  };
};

export const loggingIn = () => {
  return {
    type: LOGIN_ATTEMPT
  };
};

export const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS
  };
};
