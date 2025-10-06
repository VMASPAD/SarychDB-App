# 📝 JSON Document Examples - SarychDB Manager

This guide contains examples of valid JSON documents you can use in SarychDB Manager.

---

## 📋 Basic Structure

### Simple Document
```json
{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com"
}
```

### Document with Data Types
```json
{
  "string": "text",
  "number": 42,
  "decimal": 3.14,
  "boolean": true,
  "null": null
}
```

---

## 👤 User Examples

### Basic User
```json
{
  "name": "Maria Garcia",
  "email": "maria@example.com",
  "age": 28,
  "active": true
}
```

### Complete User
```json
{
  "name": "Carlos Lopez",
  "email": "carlos@example.com",
  "age": 35,
  "phone": "+1 555 1234",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zip": "10001",
    "country": "USA"
  },
  "role": "admin",
  "registrationDate": "2025-10-05",
  "active": true
}
```

### User with Arrays
```json
{
  "name": "Ana Martinez",
  "email": "ana@example.com",
  "hobbies": ["reading", "music", "travel"],
  "languages": ["spanish", "english", "french"],
  "social": {
    "twitter": "@anamartinez",
    "linkedin": "ana-martinez"
  }
}
```

---

## 🛍️ Product Examples

### Simple Product
```json
{
  "name": "Dell XPS 15 Laptop",
  "price": 1299.99,
  "stock": 15,
  "category": "Electronics",
  "available": true
}
```

### Complete Product
```json
{
  "name": "iPhone 15 Pro",
  "description": "Apple's latest smartphone with A17 Pro chip",
  "price": 999.99,
  "originalPrice": 1099.99,
  "discount": 100,
  "stock": 50,
  "category": "Smartphones",
  "brand": "Apple",
  "specifications": {
    "display": "6.1 inches",
    "processor": "A17 Pro",
    "ram": "8GB",
    "storage": "256GB",
    "camera": "48MP"
  },
  "colors": ["black", "silver", "blue", "gold"],
  "images": [
    "https://example.com/img1.jpg",
    "https://example.com/img2.jpg"
  ],
  "tags": ["premium", "5G", "new"],
  "available": true,
  "releaseDate": "2025-09-15"
}
```

---

## 📦 Order Examples

### Simple Order
```json
{
  "customerId": "USER123",
  "products": ["PROD001", "PROD002"],
  "total": 299.98,
  "status": "pending",
  "date": "2025-10-05"
}
```

### Complete Order
```json
{
  "orderNumber": "ORD-2025-001",
  "customer": {
    "id": "CLI123",
    "name": "Robert Sanchez",
    "email": "robert@example.com",
    "phone": "+1 555 9876"
  },
  "items": [
    {
      "product": "HP Laptop",
      "quantity": 1,
      "unitPrice": 899.99,
      "subtotal": 899.99
    },
    {
      "product": "Logitech Mouse",
      "quantity": 2,
      "unitPrice": 29.99,
      "subtotal": 59.98
    }
  ],
  "subtotal": 959.97,
  "tax": 153.60,
  "shipping": 25.00,
  "total": 1138.57,
  "paymentMethod": "card",
  "status": "processing",
  "shippingAddress": {
    "street": "456 Reform St",
    "city": "Los Angeles",
    "state": "California",
    "zip": "90001",
    "country": "USA"
  },
  "orderDate": "2025-10-05T10:30:00Z",
  "estimatedDelivery": "2025-10-10"
}
```

---

## 📝 Task/ToDo Examples

### Simple Task
```json
{
  "title": "Check emails",
  "completed": false,
  "priority": "high",
  "createdAt": "2025-10-05"
}
```

### Complete Task
```json
{
  "title": "Q4 Project Presentation",
  "description": "Prepare and present fourth quarter results",
  "completed": false,
  "priority": "high",
  "category": "work",
  "assignedTo": "sales-team",
  "tags": ["important", "urgent", "presentation"],
  "createdAt": "2025-10-05T09:00:00Z",
  "dueDate": "2025-10-15T17:00:00Z",
  "subtasks": [
    {
      "title": "Gather data",
      "completed": true
    },
    {
      "title": "Create slides",
      "completed": false
    },
    {
      "title": "Rehearse presentation",
      "completed": false
    }
  ],
  "notes": "Include comparative charts with Q3"
}
```

---

## 📊 Analytics Data Examples

### Event Log
```json
{
  "eventType": "click",
  "element": "buy-button",
  "user": "USER789",
  "timestamp": "2025-10-05T14:23:45Z",
  "page": "/products/dell-laptop",
  "session": "SES-12345",
  "device": "desktop",
  "browser": "Chrome"
}
```

### Performance Metric
```json
{
  "metric": "page-load-time",
  "value": 2.3,
  "unit": "seconds",
  "page": "/home",
  "timestamp": "2025-10-05T12:00:00Z",
  "server": "server-01",
  "region": "us-west",
  "details": {
    "dns": 0.1,
    "connection": 0.3,
    "server": 1.2,
    "rendering": 0.7
  }
}
```

---

## 🏢 Company/Organization Examples

### Simple Company
```json
{
  "name": "TechCorp Inc",
  "industry": "Technology",
  "employees": 150,
  "founded": 2010,
  "active": true
}
```

### Complete Company
```json
{
  "name": "InnovateTech Solutions",
  "legalName": "InnovateTech Solutions LLC",
  "taxId": "ITS123456ABC",
  "industry": "Software Development",
  "description": "Leading enterprise technology solutions company",
  "size": "medium",
  "employees": 250,
  "founded": 2015,
  "headquarters": {
    "address": "Corporate Tower Floor 10",
    "city": "San Francisco",
    "state": "California",
    "country": "USA"
  },
  "contact": {
    "email": "contact@innovatetech.com",
    "phone": "+1 415 123 4567",
    "website": "https://innovatetech.com"
  },
  "services": [
    "Web Development",
    "Mobile Apps",
    "IT Consulting",
    "Cloud Computing"
  ],
  "clients": ["ClientA", "ClientB", "ClientC"],
  "certifications": ["ISO 9001", "ISO 27001"],
  "social": {
    "linkedin": "innovatetech",
    "twitter": "@innovatetech"
  },
  "active": true
}
```

---

## 🎓 Education Examples

### Student
```json
{
  "name": "Laura Hernandez",
  "studentId": "2025001234",
  "major": "Computer Science",
  "semester": 6,
  "gpa": 3.7,
  "courses": [
    {
      "name": "Database Systems",
      "credits": 4,
      "grade": "A"
    },
    {
      "name": "Algorithms",
      "credits": 3,
      "grade": "B+"
    }
  ],
  "active": true
}
```

### Course
```json
{
  "name": "Full Stack Web Development",
  "code": "WEB301",
  "duration": 16,
  "unit": "weeks",
  "level": "intermediate",
  "instructor": "Prof. Garcia",
  "capacity": 30,
  "enrolled": 25,
  "price": 599.99,
  "syllabus": [
    "HTML/CSS",
    "JavaScript",
    "React",
    "Node.js",
    "MongoDB"
  ],
  "format": "online",
  "startDate": "2025-11-01",
  "available": true
}
```

---

## 🏥 Healthcare Examples

### Patient
```json
{
  "name": "Diego Ramirez",
  "dateOfBirth": "1985-03-20",
  "age": 40,
  "gender": "male",
  "bloodType": "O+",
  "allergies": ["penicillin"],
  "conditions": ["hypertension"],
  "emergencyContact": {
    "name": "Carmen Ramirez",
    "relationship": "spouse",
    "phone": "+1 555 4321"
  }
}
```

### Medical Appointment
```json
{
  "patient": "PAT-12345",
  "doctor": "Dr. Martinez",
  "specialty": "Cardiology",
  "date": "2025-10-10",
  "time": "14:00",
  "duration": 30,
  "reason": "Routine checkup",
  "status": "confirmed",
  "office": "203",
  "notes": "Bring previous test results"
}
```

---

## ✅ JSON Validation

### ✅ Valid JSON
```json
{
  "field1": "value",
  "field2": 123,
  "field3": true,
  "field4": null,
  "field5": ["item1", "item2"],
  "field6": {
    "subfield": "value"
  }
}
```

### ❌ Invalid JSON - Common Errors

```javascript
// ❌ Missing comma
{
  "name": "John"
  "age": 30
}

// ❌ Extra comma at the end
{
  "name": "John",
  "age": 30,
}

// ❌ Single quotes (must be double)
{
  'name': 'John',
  'age': 30
}

// ❌ No quotes on keys
{
  name: "John",
  age: 30
}

// ❌ Comments not allowed in JSON
{
  "name": "John", // This is the name
  "age": 30
}
```

---

## 💡 JSON Tips

1. **Always use double quotes** (`"`) for strings and keys
2. **Don't use trailing commas** after the last element
3. **Validate your JSON** before inserting/updating
4. **Use online tools** like JSONLint to validate
5. **Format correctly** with indentation for readability
6. **Numbers don't have quotes**
7. **Booleans are** `true` or `false` (lowercase, no quotes)
8. **`null` doesn't have quotes**

---

## 🔧 Recommended Tools

- **JSONLint**: https://jsonlint.com/ - Online validator
- **JSON Formatter**: VS Code extension
- **Prettier**: Automatic formatter

---

## 📚 Additional Resources

- [JSON.org](https://www.json.org/) - Official specification
- [MDN Web Docs - JSON](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON)

---

**Last updated:** October 2025
