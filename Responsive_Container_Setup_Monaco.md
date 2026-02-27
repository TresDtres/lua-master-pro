## Responsive Container Setup  
Monaco requires a parent container with defined dimensions. Use CSS to set the container’s width/height relative to the viewport or parent element. This ensures the editor scales proportionally.  

```css
#editor-container {
  width: 100%;
  height: 100vh; /* Full viewport height */
}
```

## Handling Dynamic Resizing  
Monaco doesn’t automatically adjust to container size changes. Use `ResizeObserver` to detect container resizing and trigger Monaco’s `layout()` method for recalculation.  

```javascript
const editor = monaco.editor.create(document.getElementById('editor-container'), { /* options */ });
const resizeObserver = new ResizeObserver(() => {
  editor.layout();
});
resizeObserver.observe(document.getElementById('editor-container'));
```

## Flexible Layout Integration  
For complex layouts (e.g., sidebars), combine CSS Grid/Flexbox with Monaco’s resizing logic. Adjust the editor’s dimensions when layout panels expand/collapse.  

```javascript
function adjustEditorSize() {
  const parentWidth = document.querySelector('.main-content').offsetWidth;
  const parentHeight = document.querySelector('.main-content').offsetHeight;
  editor.layout({ width: parentWidth, height: parentHeight });
}
// Call adjustEditorSize() during layout changes
```

## Mobile Responsiveness  
Override default touch behaviors and adjust font sizes for smaller screens using media queries. Disable horizontal scrolling to prevent viewport conflicts.  

```css
@media (max-width: 768px) {
  #editor-container {
    font-size: 12px;
  }
  .monaco-editor {
    touch-action: pan-y; /* Restrict touch to vertical scroll */
  }
}
```

## Programmatic Resize Control  
Use Monaco’s `onDidResize` method for manual adjustments. This is useful when integrating with third-party resizable libraries or custom UI events.  

```javascript
editor.onDidLayoutChange(({ width, height }) => {
  console.log(`New dimensions: ${width}x${height}`);
});
```  

## Viewport Sync  
Bind the editor’s size to window resizing events for full-page responsiveness. Throttle the event handler to optimize performance.  

```javascript
window.addEventListener('resize', () => {
  editor.layout();
});
```

