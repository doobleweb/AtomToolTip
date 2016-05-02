'use babel';

import MyPackageView from './my-package-view';
import { CompositeDisposable } from 'atom';
export default {

  myPackageView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.myPackageView = new MyPackageView(state.myPackageViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.myPackageView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'my-package:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.myPackageView.destroy();
  },

  serialize() {
    return {
      myPackageViewState: this.myPackageView.serialize()
    };
  },

  toggle() {
    // get the current editor from opened tab
    var editor = atom.workspace.getActiveTextEditor();
    editor.selectWordsContainingCursors();
    // wrap the word
    var selectedText = editor.getSelectedText();
    console.log(selectedText);
    // path to file
    var path = 'C:\\Users\\user\\AppData\\Roaming\\Sublime Text 3\\Packages\\ToolTip-Helper\\db\\PythonSublimeAPI.sublime-tooltip';
    var json = getJSONFile(path);
    var result = json['active_group'];
    console.log(result);

    //return (
      //this.modalPanel.isVisible() ?
      //this.modalPanel.hide() :
      //this.modalPanel.show()
    //);
  }
};

function getJSONFile(path) {
  var json;
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", path, false);
  rawFile.onreadystatechange = function ()
  {
      if(rawFile.readyState === 4)
      {
          if(rawFile.status === 200 || rawFile.status == 0)
          {
              var allText = rawFile.responseText;
              // console.log(JSON.parse(allText));
              json =  JSON.parse(allText);
              // main(JSON.parse(allText));
          }
      }
  }
  rawFile.send(null);
  return json;
}

// function main(x) {
//   console.log(x);
// }
