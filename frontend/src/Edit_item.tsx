import { useState } from 'react';
import { X } from 'lucide-react';

interface Size {
  id: string;
  size: string;
  price: string;
  available: boolean;
}

interface Edit_itemProps {
  product?: {
    id: number;
    name: string;
    img: string;
    description: string;
    sizes: Size[];
  };
  onClose: () => void;
  onSave: (product: any) => void;
  onDelete: (id: number) => void;
}

const Edit_item = ({ product, onClose, onSave, onDelete }: Edit_itemProps) => {
  const [productName, setProductName] = useState(product?.name || '');
  const [description, setDescription] = useState(product?.description || '');
  const [imageUrl, setImageUrl] = useState(product?.img || '');
  const [sizes, setSizes] = useState<Size[]>(product?.sizes || [
    { id: '1', size: '16 oz', price: '', available: true },
    { id: '2', size: '22 oz', price: '', available: true }
  ]);

  const handleAddSize = () => {
    const newSize: Size = {
      id: Date.now().toString(),
      size: '',
      price: '',
      available: true
    };
    setSizes([...sizes, newSize]);
  };

  const handleRemoveSize = (id: string) => {
    setSizes(sizes.filter(s => s.id !== id));
  };

  const handleSizeChange = (id: string, field: 'size' | 'price', value: string) => {
    setSizes(sizes.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleAvailabilityToggle = (id: string) => {
    setSizes(sizes.map(s => s.id === id ? { ...s, available: !s.available } : s));
  };

  const handleSave = () => {
    const updatedProduct = {
      id: product?.id,
      name: productName,
      img: imageUrl,
      description,
      sizes
    };
    onSave(updatedProduct);
  };

  const handleDelete = () => {
    if (product?.id && window.confirm('Are you sure you want to delete this product?')) {
      onDelete(product.id);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        width: '90%',
        maxWidth: '400px',
        maxHeight: '90vh',
        overflow: 'auto',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            background: '#3B302A',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          <X size={20} color="white" />
        </button>

        {/* Product Image */}
        <div style={{
          padding: '16px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f9fafb',
          minHeight: '300px'
        }}>
          {imageUrl ? (
            <img 
              src={imageUrl} 
              alt="Product" 
              style={{
                maxWidth: '100%',
                maxHeight: '280px',
                objectFit: 'contain'
              }}
            />
          ) : (
            <div style={{
              width: '200px',
              height: '280px',
              backgroundColor: '#e5e7eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#9ca3af'
            }}>
              No Image
            </div>
          )}
        </div>

        {/* Change Photo Button */}
        <div style={{ padding: '0 16px' }}>
          <button style={{
            width: '100%',
            backgroundColor: '#3B302A',
            color: 'white',
            padding: '12px',
            borderRadius: '24px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            Change Photo
          </button>
        </div>

        {/* Form Fields */}
        <div style={{ padding: '16px' }}>
          {/* Product Name */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              color: 'black',
              marginBottom: '8px'
            }}>
              Product Name
            </label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="If nagsend ng item, may nakalagay na placeholder text"
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                backgroundColor: 'white',
                color: '#1f2937'
              }}
            />
          </div>

          {/* Description */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              color: 'black',
              marginBottom: '8px'
            }}>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="If nagsend ng item, may nakalagay na placeholder text"
              rows={3}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
                backgroundColor: 'white',
                color: '#1f2937'
              }}
            />
          </div>

          {/* Available Sizes */}
          <div style={{ marginBottom: '15px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              color: 'black',
              marginBottom: '8px'
            }}>
              Available Sizes
            </label>

            {sizes.map((sizeItem) => (
              <div key={sizeItem.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '12px'
              }}>
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={sizeItem.available}
                  onChange={() => handleAvailabilityToggle(sizeItem.id)}
                  style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                />
                
                <input
                  type="text"
                  value={sizeItem.size}
                  onChange={(e) => handleSizeChange(sizeItem.id, 'size', e.target.value)}
                  placeholder="16 oz"
                  style={{
                    width: '70px',
                    padding: '8px 10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none',
                    backgroundColor: 'white',
                    color: '#1f2937',
                    flexShrink: 0
                  }}
                />
                
                <label style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#1f2937',
                  flexShrink: 0
                }}>
                  Price
                </label>
                
                <input
                  type="text"
                  value={sizeItem.price}
                  onChange={(e) => handleSizeChange(sizeItem.id, 'price', e.target.value)}
                  placeholder="₱140.00"
                  style={{
                    width: '90px',
                    padding: '8px 10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    outline: 'none',
                    backgroundColor: 'white',
                    color: '#1f2937',
                    flexShrink: 0
                  }}
                />
                
                <button
                  onClick={() => handleRemoveSize(sizeItem.id)}
                  style={{
                    backgroundColor: '#dc2626',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    flexShrink: 0,
                    marginLeft: 'auto'
                  }}
                >
                  −
                </button>
              </div>
            ))}

            {/* Add Size Button */}
            <button
              onClick={handleAddSize}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px dashed #d1d5db',
                borderRadius: '6px',
                backgroundColor: 'transparent',
                color: '#6b7280',
                cursor: 'pointer',
                fontSize: '14px',
                marginTop: '8px'
              }}
            >
              + Add Size
            </button>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            marginTop: '24px'
          }}>
            <button
              onClick={handleDelete}
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '24px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              Delete
            </button>
            <button
              onClick={handleSave}
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: '#3B302A',
                color: 'white',
                border: 'none',
                borderRadius: '24px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit_item;