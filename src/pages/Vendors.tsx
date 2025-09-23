import { useState, useEffect } from "react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { VendorTable } from "@/components/vendors/VendorTable";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { apiServices } from "@/lib/api-services";
import { useToast } from "@/components/ui/use-toast";

export default function Vendors() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    suspended: 0,
    revenue: "₦0"
  });

  // Form state for new restaurant
  const [newRestaurant, setNewRestaurant] = useState({
    name: "",
    description: "",
    email: "",
    phone_number: "",
    address: "",
    category: ""
  });

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const data = await apiServices.getRestaurants();
        setRestaurants(data);
        
        // Calculate stats from the data - only use real API fields
        console.log('Calculating stats for:', data);
        setStats({
          total: data.length,
          pending: 0, // API doesn't have pending status
          suspended: data.filter((r: any) => !r.isOpen).length, // Use isOpen field
          revenue: "₦0.00" // API doesn't have revenue data
        });
      } catch (error) {
        console.error('Failed to fetch restaurants:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const handleAddRestaurant = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await apiServices.createRestaurant(newRestaurant);
      toast({ description: "Restaurant added successfully!" });
      setIsAddModalOpen(false);
      
      // Reset form
      setNewRestaurant({
        name: "",
        description: "",
        email: "",
        phone_number: "",
        address: "",
        category: ""
      });
      
      // Refresh the list
      const data = await apiServices.getRestaurants();
      setRestaurants(data);
      
      // Update stats
      setStats({
        total: data.length,
        pending: 0,
        suspended: data.filter((r: any) => !r.isOpen).length,
        revenue: "₦0.00"
      });
    } catch (error) {
      console.error('Failed to add restaurant:', error);
      toast({ description: "Failed to add restaurant. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setNewRestaurant(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span className="w-6 h-6 bg-primary rounded text-primary-foreground text-sm flex items-center justify-center">
              V
            </span>
            Restaurant Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage restaurants (vendors) and their profiles
          </p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#F28C28] hover:bg-[#F28C28]/90 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add New Restaurant
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Restaurant</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddRestaurant} className="space-y-4">
              <div>
                <Label htmlFor="name">Restaurant Name *</Label>
                <Input
                  id="name"
                  value={newRestaurant.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newRestaurant.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Brief description of the restaurant"
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={newRestaurant.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={newRestaurant.phone_number}
                  onChange={(e) => handleInputChange("phone_number", e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={newRestaurant.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={newRestaurant.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  placeholder="e.g., Fast Food, Fine Dining"
                />
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddModalOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-[#F28C28] hover:bg-[#F28C28]/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add Restaurant"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="All Restaurants"
          value={stats.total.toString()}
          loading={loading}
        />
        <StatsCard
          title="Pending Restaurants"
          value={stats.pending.toString()}
          loading={loading}
        />
        <StatsCard
          title="Suspended Restaurants"
          value={stats.suspended.toString()}
          loading={loading}
        />
        <StatsCard
          title="Total Revenue"
          value={stats.revenue}
          loading={loading}
        />
      </div>

      <VendorTable restaurants={restaurants} loading={loading} />
    </div>
  );
}