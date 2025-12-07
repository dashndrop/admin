import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Mail, Phone, MapPin, ArrowLeft, AlertTriangle, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { DeliveryLoader } from "@/components/ui/delivery-loader";
import { useToast } from "@/components/ui/use-toast";
import { apiServices } from "@/lib/api-services";
import Swal from 'sweetalert2';

// Custom SweetAlert2 theme
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});

type Vendor = {
  id: string;
  name: string;
  description?: string;
  email?: string;
  phone?: string;
  phone_number?: string; // Alternative phone field
  status: "Active" | "Suspended" | "Inactive";
  category: string;
  is_approved?: boolean;
  is_open?: boolean;
  is_suspended?: boolean;
  business_registration_number?: string;
  tax_id?: string;
  business_entity_type?: string;
  business_registration_certificate?: string;
  restaurant_owner_valid_id?: string;
  proof_of_business_operation?: string;
  locations: Array<{
    address_line?: string;
    addressLine?: string;
    address_line1?: string;
    address_line2?: string;
    city?: string;
    state?: string;
    country?: string;
    postal_code?: string;
  }>;
  operating_hours?: Array<{
    day: string;
    opening_time: string;
    closing_time: string;
    is_closed: boolean;
  }>;
  cover_image_url?: string;
  created_at?: string;
  updated_at?: string;
  rating?: number;
  orders?: number;
  revenue?: string;
};

export default function VendorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const loadVendor = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await apiServices.getVendor(id);
        setVendor(data as Vendor);
      } catch (error) {
        toast({ description: "Failed to load restaurant", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    loadVendor();
  }, [id]);

  const getStatusBadgeClass = (status?: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200";
      case "Suspended":
      case "Inactive":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const showLoading = () => {
    Swal.fire({
      title: 'Processing...',
      html: 'Please wait while we process your request',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  };

  const approveRestaurant = async () => {
    if (!vendor) return;
    
    const result = await Swal.fire({
      title: 'Approve Restaurant',
      text: `Are you sure you want to approve ${vendor.name}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#10B981',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, approve it!',
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      customClass: {
        confirmButton: 'mr-2',
      },
    });

    if (!result.isConfirmed) return;
    
    setActionLoading(true);
    showLoading();
    
    try {
      await apiServices.approveRestaurant(vendor.id);
      const refreshed = await apiServices.getVendor(vendor.id);
      setVendor(refreshed as Vendor);
      
      await Swal.fire({
        title: 'Approved!',
        text: 'Restaurant has been approved successfully.',
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Failed to approve restaurant';
      await Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        confirmButtonColor: '#EF4444',
      });
    } finally {
      setActionLoading(false);
      Swal.close();
    }
  };

  // Reject functionality has been removed as per requirements
  // const rejectRestaurant = async () => {
  //   if (!vendor) return;
    
  //   const { value: reviewNotes, isDismissed } = await MySwal.fire({
  //     title: 'Reject Restaurant',
  //     text: 'Please provide a reason for rejection:',
  //     input: 'textarea',
  //     inputPlaceholder: 'Enter reason for rejection...',
  //     inputAttributes: {
  //       'aria-label': 'Enter reason for rejection'
  //     },
  //     showCancelButton: true,
  //     confirmButtonColor: '#EF4444',
  //     cancelButtonColor: '#6B7280',
  //     confirmButtonText: 'Reject',
  //     cancelButtonText: 'Cancel',
  //     reverseButtons: true,
  //     inputValidator: (value) => {
  //       if (!value) {
  //         return 'You need to provide a reason for rejection!';
  //       }
  //     },
  //     customClass: {
  //       confirmButton: 'mr-2',
  //     },
  //   });

  //   if (isDismissed || !reviewNotes) return;
    
  //   setActionLoading(true);
  //   showLoading();
    
  //   try {
  //     await apiServices.rejectRestaurant(vendor.id, reviewNotes);
  //     const refreshed = await apiServices.getVendor(vendor.id);
  //     setVendor(refreshed as Vendor);
      
  //     await MySwal.fire({
  //       title: 'Rejected!',
  //       text: 'Restaurant has been rejected.',
  //       icon: 'info',
  //       timer: 2000,
  //       timerProgressBar: true,
  //       showConfirmButton: false,
  //     });
  //   } catch (e) {
  //     const errorMessage = e instanceof Error ? e.message : 'Failed to reject restaurant';
  //     await MySwal.fire({
  //       title: 'Error!',
  //       text: errorMessage,
  //       icon: 'error',
  //       confirmButtonColor: '#EF4444',
  //     });
  //   } finally {
  //     setActionLoading(false);
  //     Swal.close();
  //   }
  // };

  const suspendRestaurant = async () => {
    if (!vendor) return;
    
    const isSuspending = vendor.status !== 'Suspended';
    const action = isSuspending ? 'suspend' : 'unsuspend';
    const actionTitle = isSuspending ? 'Suspend' : 'Unsuspend';
    
    const result = await Swal.fire({
      title: `${actionTitle} Restaurant`,
      text: `Are you sure you want to ${action} ${vendor.name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: isSuspending ? '#F59E0B' : '#10B981',
      cancelButtonColor: '#6B7280',
      confirmButtonText: `Yes, ${action} it!`,
      cancelButtonText: 'Cancel',
      reverseButtons: true,
      customClass: {
        confirmButton: 'mr-2',
      },
    });

    if (!result.isConfirmed) return;
    
    setActionLoading(true);
    showLoading();
    
    try {
      await apiServices.suspendRestaurant(vendor.id);
      const refreshed = await apiServices.getVendor(vendor.id);
      setVendor(refreshed as Vendor);
      
      await Swal.fire({
        title: `${actionTitle}ed!`,
        text: `Restaurant has been ${action}ed successfully.`,
        icon: 'success',
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : `Failed to ${action} restaurant`;
      await Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        confirmButtonColor: '#EF4444',
      });
    } finally {
      setActionLoading(false);
      Swal.close();
    }
  };

  // Delete functionality has been removed as per requirements
  // const deleteRestaurant = async () => {
  //   if (!vendor) return;
    
  //   const result = await MySwal.fire({
  //     title: 'Delete Restaurant',
  //     text: `Are you sure you want to delete ${vendor.name}? This action cannot be undone!`,
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#EF4444',
  //     cancelButtonColor: '#6B7280',
  //     confirmButtonText: 'Yes, delete it!',
  //     cancelButtonText: 'Cancel',
  //     reverseButtons: true,
  //     customClass: {
  //       confirmButton: 'mr-2',
  //     },
  //   });

  //   if (!result.isConfirmed) return;
    
  //   setActionLoading(true);
  //   showLoading();
    
  //   try {
  //     await apiServices.deleteRestaurant(vendor.id);
      
  //     await MySwal.fire({
  //       title: 'Deleted!',
  //       text: 'Restaurant has been deleted.',
  //       icon: 'success',
  //       timer: 2000,
  //       timerProgressBar: true,
  //       showConfirmButton: false,
  //       willClose: () => {
  //         navigate("/vendors");
  //       }
  //     });
  //   } catch (e) {
  //     const errorMessage = e instanceof Error ? e.message : 'Failed to delete restaurant';
  //     await MySwal.fire({
  //       title: 'Error!',
  //       text: errorMessage,
  //       icon: 'error',
  //       confirmButtonColor: '#EF4444',
  //     });
  //   } finally {
  //     setActionLoading(false);
  //     Swal.close();
  //   }
  // };

  if (loading) {
    return (
      <div className="space-y-6">
        <DeliveryLoader label="Fetching restaurant" />
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="space-y-6">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <p className="text-muted-foreground">Restaurant not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-orange-500 rounded-lg flex items-center justify-center">
                <Building2 className="h-8 w-8 text-white" />
              </div>
              <div className="flex items-center gap-3">
                <Badge className={`px-3 py-1 ${getStatusBadgeClass(vendor.status)}`}>{vendor.status}</Badge>
                <h2 className="text-xl font-semibold">{vendor.name}</h2>
              </div>
            </div>
            <div className="flex gap-2">
              {vendor.status !== 'Active' && (
                <Button 
                  onClick={approveRestaurant} 
                  disabled={actionLoading} 
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Approve
                </Button>
              )}
              {/* Reject button removed as per requirements */}
              {/* <Button 
                onClick={rejectRestaurant} 
                disabled={actionLoading} 
                className="bg-yellow-600 hover:bg-yellow-700 text-white"
              >
                Reject
              </Button> */}
              <Button 
                onClick={suspendRestaurant} 
                disabled={actionLoading} 
                variant="outline"
                className="border-red-500 text-red-600 hover:bg-red-50"
              >
                {vendor.status === 'Suspended' ? 'Unsuspend' : 'Suspend'}
              </Button>
              {/* Delete button removed as per requirements */}
              {/* <Button 
                onClick={deleteRestaurant} 
                disabled={actionLoading} 
                variant="destructive"
              >
                Delete
              </Button> */}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        {/* Basic Information Card */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Business Name</p>
                <p className="text-sm">{vendor.name}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Category</p>
                <p className="text-sm capitalize">{vendor.category || 'N/A'}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{vendor.email || 'N/A'}</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Phone</p>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{vendor.phone_number || vendor.phone || 'N/A'}</span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Status</p>
                <Badge className={getStatusBadgeClass(vendor.status)}>
                  {vendor.status}
                </Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Approval Status</p>
                <Badge variant={vendor.is_approved ? 'default' : 'secondary'}>
                  {vendor.is_approved ? 'Approved' : 'Pending Approval'}
                </Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Business Status</p>
                <Badge variant={vendor.is_open ? 'default' : 'secondary'}>
                  {vendor.is_open ? 'Open' : 'Closed'}
                </Badge>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Suspension Status</p>
                <Badge variant={vendor.is_suspended ? 'destructive' : 'default'}>
                  {vendor.is_suspended ? 'Suspended' : 'Active'}
                </Badge>
              </div>
            </div>
            
            {vendor.description && (
              <div className="space-y-2 pt-2">
                <p className="text-sm font-medium text-muted-foreground">Description</p>
                <p className="text-sm text-foreground">{vendor.description}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Business Details Card */}
        <Card>
          <CardHeader>
            <CardTitle>Business Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Business Registration Number</p>
                <p className="text-sm">{vendor.business_registration_number || 'N/A'}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Tax ID</p>
                <p className="text-sm">{vendor.tax_id || 'N/A'}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Business Entity Type</p>
                <p className="text-sm">{vendor.business_entity_type || 'N/A'}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Created At</p>
                <p className="text-sm">{vendor.created_at ? new Date(vendor.created_at).toLocaleString() : 'N/A'}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Last Updated</p>
                <p className="text-sm">{vendor.updated_at ? new Date(vendor.updated_at).toLocaleString() : 'N/A'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents Section */}
        <Card>
          <CardHeader>
            <CardTitle>Business Documents</CardTitle>
            <p className="text-sm text-muted-foreground">Documents provided by the business</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Business Registration Certificate</p>
                {vendor.business_registration_certificate ? (
                  <a 
                    href={vendor.business_registration_certificate} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <span>View Document</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                ) : (
                  <p className="text-sm text-muted-foreground">Not provided</p>
                )}
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Owner's Valid ID</p>
                {vendor.restaurant_owner_valid_id ? (
                  <a 
                    href={vendor.restaurant_owner_valid_id} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <span>View Document</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                ) : (
                  <p className="text-sm text-muted-foreground">Not provided</p>
                )}
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Proof of Business Operation</p>
                {vendor.proof_of_business_operation ? (
                  <a 
                    href={vendor.proof_of_business_operation} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <span>View Document</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                ) : (
                  <p className="text-sm text-muted-foreground">Not provided</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Locations Section */}
        {vendor.locations && vendor.locations.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Business Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {vendor.locations.map((location, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Location {index + 1}</h4>
                    <div className="space-y-1 text-sm">
                      {location.address_line1 && <p>{location.address_line1}</p>}
                      {location.address_line2 && <p>{location.address_line2}</p>}
                      <p className="text-muted-foreground">
                        {[location.city, location.state, location.country]
                          .filter(Boolean)
                          .join(', ')}
                      </p>
                      {location.postal_code && <p className="text-muted-foreground">{location.postal_code}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Operating Hours Section */}
        {vendor.operating_hours && vendor.operating_hours.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Operating Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {vendor.operating_hours.map((hours, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                    <span className="font-medium">{hours.day}:</span>
                    <span className="text-sm text-muted-foreground">
                      {hours.is_closed 
                        ? 'Closed' 
                        : `${hours.opening_time} - ${hours.closing_time}`}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}