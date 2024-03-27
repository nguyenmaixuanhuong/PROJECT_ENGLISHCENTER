import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import { useLocation } from "react-router-dom";

function Document() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const url = params.get('url');
    const docs = [
        { uri: url}
      ];

  return (
    <div className=" container test">
        <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} />;
    </div>
  )
  
}

export default Document;