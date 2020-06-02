import {$} from '@core/dom';
export function initResize(event, $root) {
    const $target = $(event.target);
    const $parent = $target.closest('[data-type="resized"]');
    const coords = $parent.getCoords();
    const type = $target.data.resize;
    const typeStyle = type === 'col' ? 'bottom' : 'right';
    let value = 0;
    $target.css({
        [typeStyle]: '-5000px',
        opacity: 1,
    });

    document.onmousemove = (e) => {
        if (type === 'col') {
            const delta = e.pageX - coords.right;
            value = coords.width + delta;
            $target.css({right: -delta + 'px'});
        } else {
            const delta = e.pageY - coords.bottom;
            value = coords.height + delta;
            $target.css({bottom: -delta + 'px'});
        }
    };

    document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        if (type === 'col') {
            $root.queryAll(`[data-col="${$parent.data.col}"]`)
                .forEach((cell) => cell.style.width = value + 'px');
        } else {
            $parent.css({height: value + 'px'});
        }

        $target.css({
            opacity: 0,
            right: 0,
            bottom: 0,
        });
    };
}