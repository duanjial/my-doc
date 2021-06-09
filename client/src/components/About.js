import React from "react";

export default function About() {
  return (
    <div>
      <h1>This is about page</h1>
      <h2>Example body text</h2>
      <p>
        Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque
        penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        Nullam id dolor id nibh ultricies vehicula.
      </p>
      <p>
        <small>This line of text is meant to be treated as fine print.</small>
      </p>
      <p>
        The following is <strong>rendered as bold text</strong>.
      </p>
      <p>
        The following is <em>rendered as italicized text</em>.
      </p>
      <p>
        An abbreviation of the word attribute is{" "}
        <abbr title="attribute">attr</abbr>.
      </p>
    </div>
  );
}
