# 🚀 Quick Start Guide - Test the Integration

## Files Created/Updated

### ✅ New Files Created
1. **client/src/api/educationApi.ts** (80 lines)
   - All API calls for lectures and videos
   - Handles authentication automatically

2. **client/src/components/VideoLectureForm.tsx** (120 lines)
   - Modal for adding/editing videos
   - Fields: Title, Description, URL, Duration

3. **client/src/components/DocumentLectureForm.tsx** (140 lines)
   - Modal for adding/editing documents
   - File upload with validation

### ✅ Files Updated
1. **client/src/pages/Admin.tsx**
   - Updated handleSaveLecture() to handle both types
   - Updated handleEditLecture() to detect type
   - Updated handleDeleteLecture() with proper API

---

## Setup Instructions

### Step 1: Verify Backend is Running
```bash
cd d:\AWSOME\backend
npm run start
# Should show: Server running on port 5000
```

### Step 2: Start Frontend
```bash
cd d:\AWSOME\client
npm run dev
# Should show: Local: http://localhost:5173
```

### Step 3: Login as Admin
1. Open browser: http://localhost:5173
2. Click Login
3. Use admin credentials:
   - Email: admin@example.com
   - Password: admin@123

### Step 4: Navigate to Admin Dashboard
1. After login, go to Admin Dashboard
2. Click on "Education" tab
3. Click "Manage Lectures" on any education item

---

## Testing Flow

### Test 1: Add a Video

1. **Click "Add Video" button**
   - Should open blue VideoLectureForm modal

2. **Fill the form:**
   ```
   Title: "React Basics"
   Description: "Learn React fundamentals"
   Video URL: "https://www.youtube.com/watch?v=example"
   Duration: "45" minutes
   ```

3. **Click "Add Video" button**
   - Form should show loading spinner
   - Should close after 2-3 seconds
   - New video should appear in list with 🔗 URL badge

4. **Verify in Admin list:**
   - Title: "React Basics"
   - Badges should show: 🔗 URL, 📝 Notes (maybe), ⏱️ 45 min

---

### Test 2: Add a Document

1. **Click "Add Document" button**
   - Should open purple DocumentLectureForm modal

2. **Fill the form:**
   ```
   Title: "Physics Chapter 1"
   Description: "Fundamentals of physics"
   ```

3. **Upload a file:**
   - Click the upload area
   - Select a PDF or Word file from your computer
   - File name should appear in the upload area

4. **Click "Add Document" button**
   - Form should show loading spinner
   - File uploads to server
   - Modal closes
   - New document appears in list with 📁 File badge

5. **Verify in Admin list:**
   - Title: "Physics Chapter 1"
   - Badges should show: 📁 File

---

### Test 3: Edit a Lecture

1. **Click Edit icon (pencil)** on any lecture
   - Should detect type (video or document)
   - Correct form should open with data pre-filled

2. **For Video:**
   - All fields should show current data
   - Modify title or URL
   - Click "Update"
   - Should update in list

3. **For Document:**
   - Title and description pre-filled
   - File optional (can leave blank)
   - Modify title or upload new file
   - Click "Update"
   - Should update in list

---

### Test 4: Delete a Lecture

1. **Click Delete icon (trash)** on any lecture
   - Confirmation dialog should appear

2. **Click "Delete" in dialog**
   - Item should remove from list
   - Success toast should show
   - File should be deleted from server /uploads/

---

## Expected Results

### ✅ Success Scenarios

**Create Video:**
```
✓ Modal opens
✓ Form fields work
✓ Can enter URL
✓ Can set duration
✓ Submit works
✓ List refreshes
✓ New video appears with 🔗 badge
✓ Success toast shows
```

**Create Document:**
```
✓ Modal opens
✓ Form fields work
✓ File upload works
✓ File selected shows filename
✓ Submit works
✓ List refreshes
✓ New document appears with 📁 badge
✓ File in /uploads/ folder
✓ Success toast shows
```

**Edit:**
```
✓ Click edit opens correct form
✓ Data pre-filled
✓ Can modify fields
✓ Update button works
✓ List refreshes
✓ Changes appear
```

**Delete:**
```
✓ Delete icon triggers confirmation
✓ Confirm deletes item
✓ List updates immediately
✓ File deleted from server
✓ Success toast shows
```

---

## Error Testing

### Try These to Test Error Handling

1. **Missing Title:**
   - Leave title blank
   - Click Add/Update
   - Should show alert: "Please enter a video title"

2. **Missing Video URL:**
   - Enter title only
   - Leave URL blank
   - Click Add
   - Should show alert: "Please enter a video URL"

3. **Missing Document:**
   - Enter title only
   - Click Add (without file)
   - Should show alert: "Please select a document file"

4. **Wrong File Type:**
   - Try uploading .txt or .jpg file
   - Should show alert: "Please upload a PDF or DOC file"

---

## Troubleshooting

### Issue: "Add Video" button not visible
**Solution:**
- Make sure you clicked "Manage Lectures"
- Make sure selectedEducationId is set
- Check browser console for errors

### Issue: Form doesn't open
**Solution:**
- Check browser console for JavaScript errors
- Make sure all components are imported
- Verify educationApi.ts exists

### Issue: Submit doesn't work
**Solution:**
- Check backend is running (port 5000)
- Check auth token in localStorage
- Look at network tab to see API call
- Check backend logs for errors

### Issue: File not uploading
**Solution:**
- Make sure file is PDF or DOC
- Check /uploads/ folder exists on backend
- Check file size < 50MB
- Look at network tab for error response

### Issue: List doesn't refresh
**Solution:**
- Check fetchLecturesForEducation is called
- Check backend response has `success: true`
- Try manual page refresh (F5)

---

## API Endpoints Being Called

### When You Add a Video:
```
POST /api/v1/vedios/create
Authorization: Bearer <TOKEN>
Body: {
  "title": "...",
  "description": "...",
  "videoUrl": "...",
  "duration": 45,
  "educationId": "..."
}
```

### When You Add a Document:
```
POST /api/v1/lectures/create
Authorization: Bearer <TOKEN>
Content-Type: multipart/form-data
Body: FormData {
  title: "...",
  description: "...",
  educationId: "...",
  document: File
}
```

### When You Get Lectures:
```
GET /api/v1/lectures/education/[educationId]
Response: {
  "success": true,
  "lectures": [...]
}
```

---

## Files to Check

If something doesn't work, check these files:

1. **Backend Running?**
   ```bash
   cd d:\AWSOME\backend
   npm run start
   # Look for: "Server running on port 5000"
   ```

2. **API File Exists?**
   ```bash
   ls d:\AWSOME\client\src\api\educationApi.ts
   # Should exist
   ```

3. **Form Components Exist?**
   ```bash
   ls d:\AWSOME\client\src\components\*Form.tsx
   # Should see both VideoLectureForm and DocumentLectureForm
   ```

4. **Admin.tsx Updated?**
   ```bash
   grep -n "handleSaveLecture\|lectureFormMode" d:\AWSOME\client\src\pages\Admin.tsx
   # Should show updated functions
   ```

---

## Success Checklist

Mark these off as you test:

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can login as admin
- [ ] Admin Dashboard loads
- [ ] Education Tab visible
- [ ] Can click "Manage Lectures"
- [ ] "Add Video" button visible
- [ ] "Add Document" button visible
- [ ] VideoLectureForm opens and works
- [ ] DocumentLectureForm opens and works
- [ ] Can create video
- [ ] Can create document
- [ ] Can edit video
- [ ] Can edit document
- [ ] Can delete with confirmation
- [ ] List refreshes after changes
- [ ] Toasts show for success/error
- [ ] Files upload to /uploads/
- [ ] Files deleted when lecture deleted

---

## Monitor Logs

### Backend Logs to Watch For:
```
✓ Server running on port 5000
✓ MongoDB connected
✓ POST /api/v1/vedios/create
✓ POST /api/v1/lectures/create
```

### Frontend Logs to Watch For:
```
✓ API calls in Network tab
✓ Response status 200/201
✓ No JavaScript errors in Console
```

---

## Next Steps If All Works

1. ✅ Test all CRUD operations thoroughly
2. ✅ Test with different file types
3. ✅ Test error scenarios
4. ✅ Check database for saved records
5. ✅ Verify files in /uploads/ folder
6. ✅ Deploy to production

---

## Contact for Issues

If something doesn't work:
1. Check browser console (F12)
2. Check backend logs
3. Check network tab (F12)
4. Verify all files created
5. Verify backend running on 5000

**Everything should work now! Let's test 🚀**
