import { useState } from "react";
import {
  BlockEditorProvider,
  BlockList,
  BlockTitle,
  BlockTools,
  WritingFlow,
} from "@wordpress/block-editor";
import { BlockCanvas } from "@wordpress/block-editor/build/components";
import "@wordpress/components/build-style/style.css";
import "@wordpress/block-editor/build-style/style.css";

export default function MyEditorComponent() {
  const [blocks, updateBlocks] = useState([]);

  return (
    <BlockEditorProvider
      value={blocks}
      onInput={(blocks) => updateBlocks(blocks)}
      onChange={(blocks) => updateBlocks(blocks)}
    >
      <BlockTitle
        clientId="afd1cb17-2c08-4e7a-91be-007ba7ddc3a1"
        maximumLength={17}
      />
      <BlockTools>
        <BlockCanvas height="400px" />
      </BlockTools>
    </BlockEditorProvider>
  );
}
