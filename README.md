# node-red-contrib-node-list
A Node Red node to list the available nodes in the flow

**!!!!!! Experimental node !!!!!!**

## Install
Not published to NPM yet.  
Please install directly from github.

Run temporarily the following npm command in your Node-RED user directory (typically ~/.node-red):
```
npm install https://github.com/bartbutenaers/node-red-contrib-node-list.git
```
## Usage
This node will get all the available nodes (from the flows) or tabsheets, depending on the settings.  
The *msg.payload* will contain a JSON array, containing following fields for every node/tabsheet:
* The id
* The type (e.g. ui_tab, comment, ...)
* The name (in case of a node) or the label (in case of a tabsheet)

## Node configuration

### Category
Specify whether tabsheets or real nodes should appear in the output list.

### Type
Optionally specify a regular expression, to filter specific types.

If not required, leave this field empty.

### Name
Optionally specify a regular expression, to filter specific names (for nodes) or labels (for tabsheets).

If not required, leave this field empty.
