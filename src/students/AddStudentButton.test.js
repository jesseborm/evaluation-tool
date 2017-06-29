import { mount } from 'enzyme';
import sinon from 'sinon';
import AddStudentButton from './AddStudentButton';

describe('<AddStudentButton />', () => {
  it('calls componentDidMount', () => {
    sinon.spy(AddStudentButton.prototype, 'componentDidMount');
    const wrapper = mount(<AddStudentButton />);
    expect(AddStudentButton.prototype.componentDidMount.calledOnce).to.equal(true);
  });

  it('allows us to set props', () => {
    const wrapper = mount(<AddStudentButton bar="baz" />);
    expect(wrapper.props().bar).to.equal('baz');
    wrapper.setProps({ bar: 'addStudentButton' });
    expect(wrapper.props().bar).to.equal('foo');
  });

  it('simulates click events', () => {
    const onButtonClick = sinon.spy();
    const wrapper = mount((
      <AddStudentButton onButtonClick={onButtonClick} />
    ));
    wrapper.find('button').simulate('click');
    expect(onButtonClick.calledOnce).to.equal(true);
  });

})
