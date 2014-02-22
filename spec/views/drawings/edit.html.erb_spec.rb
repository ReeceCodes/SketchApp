require 'spec_helper'

describe "drawings/edit" do
  before(:each) do
    @drawing = assign(:drawing, stub_model(Drawing,
      :id => 1,
      :name => "MyString",
      :commands => "MyString"
    ))
  end

  it "renders the edit drawing form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form[action=?][method=?]", drawing_path(@drawing), "post" do
      assert_select "input#drawing_id[name=?]", "drawing[id]"
      assert_select "input#drawing_name[name=?]", "drawing[name]"
      assert_select "input#drawing_commands[name=?]", "drawing[commands]"
    end
  end
end
