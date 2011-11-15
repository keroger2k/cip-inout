class AddDetailsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :available, :bit, :default => true
    add_column :users, :message, :string
    add_column :users, :returns, :date, :default => Time.now 
  end
end
