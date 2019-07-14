import React from "react";
import redraft from 'redraft';

const inline = {
    BOLD: (children, { key }) => <strong key={key}>{children}</strong>,
    ITALIC: (children, { key }) => <em key={key}>{children}</em>,
    UNDERLINE: (children, { key }) => <u key={key}>{children}</u>,
};

const addBreaklines = (children, keys) => children.map((child, index) => [<span key={keys[index]}>{child}</span>, <br key={index}/>]);

/**
 * Note that children can be mapped to render a list or do other cool stuff
 */
const blocks = {
    // Rendering blocks like this along with cleanup results in a single p tag for each paragraph
    // adding an empty block closes current paragraph and starts a new one
    unstyled: (children, { keys }) => <p key={keys[0]}>{addBreaklines(children, keys)}</p>,
    'header-one': (children, { keys }) => children.map((child, i) => <h1 key={keys[i]}>{child}</h1>),
    'header-two': (children, { keys }) => children.map((child, i) => <h2 key={keys[i]}>{child}</h2>),
    'header-three': (children, { keys }) => children.map((child, i) => <h3 key={keys[i]}>{child}</h3>),
    'header-four': (children, { keys }) => children.map((child, i) => <h4 key={keys[i]}>{child}</h4>),
    'header-five': (children, { keys }) => children.map((child, i) => <h5 key={keys[i]}>{child}</h5>),
    'header-six': (children, { keys }) => children.map((child, i) => <h6 key={keys[i]}>{child}</h6>),
    'unordered-list-item': (children, { depth, keys }) => <ul key={keys[keys.length - 1]} className={`ul-level-${depth}`}>{children.map((child, index) => <li key={keys[index]}>{child}</li>)}</ul>,
    'ordered-list-item': (children, { depth, keys }) => <ol key={keys.join('|')} className={`ol-level-${depth}`}>{children.map((child, index) => <li key={keys[index]}>{child}</li>)}</ol>,
};

const entities = {
    LINK: (children, entity, { key }) => (
        <a key={key} href={entity.url}>
            {children}
        </a>
    ),
};

const isEmptyRaw = raw => !raw || !raw.blocks || (raw.blocks.length === 1 && raw.blocks[0].text === '');

const options = {
    cleanup: {
        after: 'all',
        types: 'all',
        split: true,
    },
};

export default function Preview({raw}) {
    const isEmpty = isEmptyRaw(raw);

    return <React.Fragment>
        {!isEmpty && redraft(raw, { inline, blocks, entities }, options)}
    </React.Fragment>
}

