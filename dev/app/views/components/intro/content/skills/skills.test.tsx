import * as React from 'react';
import { shallow, mount, render } from 'enzyme';
import { Skills, SkillsProps } from './skills';

const mockSkills: SkillsProps['skills'] = [
  {
    displayLabel: 'Foo',
    isCore: true,
    uuid: '277d793d-1585-4870-9200-acee39522bd4'
  },
  {
    displayLabel: 'Bar',
    isCore: true,
    uuid: '66b58521-fab3-432e-8ab1-63f3041297ec'
  },
  {
    displayLabel: 'Baz',
    isCore: true,
    uuid: '6ff752ab-f9b7-4f25-bcc4-c2bed53ea6d3'
  },
];

describe('The Skills component.', () => {
  it('Should match the snapshot.', () => {
    const test_1 = shallow(
      <Skills skills={mockSkills} />
    );

    expect(test_1).toMatchSnapshot();
  });

  it('Should render according to its props.', () => {
    const test_1 = shallow(
      <Skills skills={mockSkills} />
    );
    const test_2 = shallow(
      <Skills skills={[]} />
    );

    expect(test_1.find('.skills').children().length).toBe(3);
    expect(test_2.find('.skills').children().length).toBe(0);
  });
});