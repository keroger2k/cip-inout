class AddDetailsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :available, :bit, :default => true
    add_column :users, :message, :string
    add_column :users, :returns, :string 
    add_column :users, :name, :string 
  end
end
