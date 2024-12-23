import * as vscode from "vscode";
import { CopiedItemsViewProvider } from "./view";
let copiedItems: string[] = [];

export function activate(context: vscode.ExtensionContext) {
  // Register the view provider for the activity bar
  const provider = new CopiedItemsViewProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("copiedItemsView", provider)
  );

  // Clipboard polling to detect new copied items
  setInterval(async () => {
    const clipboardContent = await vscode.env.clipboard.readText();
    if (clipboardContent && !copiedItems.includes(clipboardContent)) {
      copiedItems.push(clipboardContent);
      provider.updateView(copiedItems);
    }
  }, 1000);
}

export function deactivate() {}

// Webview view provider class

// class CopiedItemsViewProvider implements vscode.WebviewViewProvider {
//   private _view?: vscode.WebviewView;

//   constructor(private readonly _extensionUri: vscode.Uri) {}

//   public resolveWebviewView(
//     webviewView: vscode.WebviewView,
//     _context: vscode.WebviewViewResolveContext,
//     _token: vscode.CancellationToken
//   ) {
//     this._view = webviewView;

//     // Set up the Webview HTML content
//     webviewView.webview.options = {
//       enableScripts: true,
//     };
//     webviewView.webview.html = this.getHtmlForWebview(webviewView.webview);

//     // Send the initial list of copied items
//     this.updateView([]);
//   }

//   public updateView(copiedItems: string[]) {
//     if (this._view) {
//       this._view.webview.postMessage({ items: copiedItems });
//     }
//   }

//   private getHtmlForWebview(webview: vscode.Webview): string {
//     const htmlFilePath = vscode.Uri.joinPath(
//       this._extensionUri,
//       "webview",
//       "copiedItems.html"
//     );

//     return webview.asWebviewUri(htmlFilePath).toString();
//   }
// }
