import React from "react";
import { shallow } from "enzyme";
import Lists from "./Lists";

describe("Lists", () => {
  test("matches snapshot", () => {
    const wrapper = shallow(<Lists />);
    expect(wrapper).toMatchSnapshot();
  });
});
