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

    // Set initial HTML content
    this.updateView([]);
  }

  public updateView(copiedItems: string[]) {
    if (this._view) {
      const listHtml = copiedItems.map((item) => `<li>${item}</li>`).join("");
      this._view.webview.html = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Copied Items</title>
                </head>
                <body>
                    <h1>Copied Items</h1>
                    <ul>${listHtml}</ul>
                </body>
                </html>
            `;
    }
  }
}
