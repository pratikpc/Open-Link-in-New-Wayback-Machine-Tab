// Utility function to detect the browser
// The `browser` object is unique to Firefox, while `chrome` is used by both Chrome and Firefox (with different APIs).
// We check if `browser` is defined, which indicates the extension is running in Firefox. If it's not, we assume it's Chrome.
const isFirefox = typeof browser !== "undefined";

// Choose the correct API based on the browser (Firefox or Chrome)
// The `contextMenus`, `tabs`, and `onContextMenuClicked` APIs differ between Firefox and Chrome. This allows us to use the correct API
// dynamically based on the browser detected above.

const contextMenus = isFirefox ? browser.contextMenus : chrome.contextMenus; // `contextMenus` API for Firefox/Chrome context menus
const tabs = isFirefox ? browser.tabs : chrome.tabs; // `tabs` API to interact with browser tabs (open new tabs)
const onContextMenuClicked = isFirefox ? browser.contextMenus.onClicked : chrome.contextMenus.onClicked; // Listener for context menu clicks

// Create the context menu item
// This is where we define the menu item that will appear when the user right-clicks on a link
contextMenus.create({
  id: "open-in-new-wayback-machnine-tab", // Unique identifier for this context menu item, used for tracking clicks
  title: "Open link in a new Wayback Machine tab", // Text displayed in the context menu
  contexts: ["link"], // This defines the type of content the menu item will appear on; "link" means it shows when right-clicking a link
  icons: {
    "48": "icons/icon.png" // Optional: Adds an icon to the context menu item. This icon appears next to the title.
    // The icon's size is 48x48 pixels (standard for context menus).
  }
});

// Handle the event when the context menu item is clicked
// We use this listener to define the action that happens when the user clicks the "Open link in a new tab" item
onContextMenuClicked.addListener((info, tab) => {
  // `info` contains details about the clicked context menu item. `tab` contains information about the current tab.
  
  // Check if the correct menu item was clicked and if a valid link was right-clicked
  if (info.menuItemId === "open-in-new-wayback-machnine-tab" && info.linkUrl) {
    // `info.menuItemId` ensures that the user clicked the correct context menu item
    // `info.linkUrl` provides the URL of the link the user right-clicked on. We check if it's available to ensure we're working with a link.
    
    // Open the link in a new tab
    // `tabs.create()` creates a new tab in the browser and loads the URL that was right-clicked
    tabs.create({ url: "https://web.archive.org/web/29950000000000/" + info.linkUrl });
  }
});
