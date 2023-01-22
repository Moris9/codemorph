import { createUnifiedTree } from '../../angular/morph-angular-html';
import visit = require('unist-util-visit');
import { EditHtmlFile } from "../../angular/interfaces/edit-html.interface";

export function appendHtml(editHtmlFile: EditHtmlFile, fileToBeAddedToTree: any): any {
  let counter = 0;
  let elementToReturn: any;

  const element = editHtmlFile.tagNameToInsertInto ? {type: 'element', tagName: editHtmlFile.tagNameToInsertInto} : {type: 'element', tagName: 'body'};

  visit(fileToBeAddedToTree, element, (htmlElement: any) => {
    const codeToAddTree = createUnifiedTree(editHtmlFile.codeBlock as string);
    if(counter === 0) {
      htmlElement.children.push(codeToAddTree);
      elementToReturn = editHtmlFile.tagNameToInsertInto ? htmlElement : htmlElement.children;
      counter++;
    }
  });

  return elementToReturn;
}