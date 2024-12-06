import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
export class CopiedItemsViewProvider implements vscode.WebviewViewProvider {
  private _view?: vscode.WebviewView;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(
    webviewView: vscode.WebviewView,
    _context: vscode.WebviewViewResolveContext,
    _token: vscode.CancellationToken
  ) {
    this._view = webviewView;

    // Set up the Webview HTML content
    webviewView.webview.options = {
      enableScripts: true,
    };
    webviewView.webview.html = this.getHtmlForWebview(webviewView.webview);

    // Send the initial list of copied items
    this.updateView([]);
  }

  public updateView(copiedItems: string[]) {
    if (this._view) {
      this._view.webview.postMessage({ items: copiedItems });
    }
  }

  private getHtmlForWebview(webview: vscode.Webview): string {
    const htmlFilePath = path.join(
      this._extensionUri.fsPath,
      "webview",
      "copiedItems.html"
    );

    let html = fs.readFileSync(htmlFilePath, "utf-8");

    // Replace placeholders in the HTML
    html = html.replace(
      /{{vscode-resource}}/g,
      webview.asWebviewUri(vscode.Uri.file(htmlFilePath)).toString()
    );

    return html;
  }
}
