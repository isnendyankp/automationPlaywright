import {test, expect, request} from '@playwright/test';



// basic navigation test
// can test with npx playwright test --ui
test('basic navigation test', async ({ page }) => {
    await page.goto('https://gitlab.com/');
    await page.waitForTimeout(3000);
    await page.reload();
});


// test interaction with the page
// test with npx playwright test --project chromium --headed for visual testing
// Note:
// locator digunakan untuk mencari elemen pada halaman
test('test interaction with the page', async ({ page }) => {
    await page.goto('https://gitlab.com/');
    // kode ini akan mencari elemen dengan role link dan nama Get free trial lalu melakukan klik
    await page.locator('#be-navigation-desktop').getByRole('link', {name: 'Get free trial'}).click();
    // kode ini mengetest input first name dan last name pada halaman
    // data-testid digunakan untuk memberikan nama pada elemen pada kasus ini first name dan last name menggunakan for 
    await page.locator('[data-testid="new-user-first-name-field"]').fill('John');
    await page.locator('[data-testid="new-user-last-name-field"]').fill('Doe');
});


// test interaction with the page by click button sign in at main menu dropdown
// test with npx playwright test --project chromium --headed for visual testing
test('test interaction with the page by click button sign in at main menu dropdown', async ({ page }) => {
    await page.goto('https://gitlab.com/');
    await page.getByRole('link', {name: 'Sign in'}).click();
});


//  Test API
test.describe('User Management API Testing', () => {
  let apiContext;

  // Setup: Membuat koneksi API sebelum pengujian
  test.beforeAll(async ({ playwright }) => {
    apiContext = await request.newContext({
      baseURL: 'https://jsonplaceholder.typicode.com', // Base URL untuk dummy API
    });
  });

  // Tes 1: GET /users - Mendapatkan daftar pengguna
  test('GET /users - should return list of users', async () => {
    const response = await apiContext.get('/users');

    // Verifikasi status response
    expect(response.status()).toBe(200);

    // Parsing response JSON
    const users = await response.json();

    // Verifikasi bahwa responsenya adalah array dan berisi pengguna
    expect(Array.isArray(users)).toBeTruthy();
    expect(users.length).toBeGreaterThan(0);

    // Verifikasi bahwa pengguna pertama memiliki properti yang benar
    expect(users[0]).toHaveProperty('id');
    expect(users[0]).toHaveProperty('name');
    expect(users[0]).toHaveProperty('email');
  });

  // Tes 2: POST /users - Membuat pengguna baru
  test('POST /users - should create a new user', async () => {
    const newUser = {
      name: 'reza',
      username: 'reza',
      email: 'reza@example.com',
    };

    const response = await apiContext.post('/users', {
      data: newUser,
    });

    // Verifikasi status response
    expect(response.status()).toBe(201);

    // Parsing response JSON
    const createdUser = await response.json();

    // Verifikasi bahwa pengguna yang dibuat sesuai dengan input
    expect(createdUser).toHaveProperty('id'); // ID yang dihasilkan oleh server
    expect(createdUser.name).toBe(newUser.name);
    expect(createdUser.username).toBe(newUser.username);
    expect(createdUser.email).toBe(newUser.email);
  });

  // Tes 3: PUT /users/{id} - Memperbarui pengguna
  test('PUT /users/1 - should update an existing user', async () => {
    const updatedUser = {
      name: 'reza Updated',
      username: 'rezaupdated',
      email: 'rezaupdated@example.com',
    };

    const response = await apiContext.put('/users/1', {
      data: updatedUser,
    });

    // Verifikasi status response
    expect(response.status()).toBe(200);

    // Parsing response JSON
    const user = await response.json();

    // Verifikasi bahwa data pengguna telah diperbarui
    expect(user.name).toBe(updatedUser.name);
    expect(user.username).toBe(updatedUser.username);
    expect(user.email).toBe(updatedUser.email);
  });

  // Tes 4: DELETE /users/{id} - Menghapus pengguna
  test('DELETE /users/1 - should delete the user', async () => {
    const response = await apiContext.delete('/users/1');

    // Verifikasi status response
    expect(response.status()).toBe(200);
  });

  // Cleanup: Menutup koneksi API setelah pengujian selesai
  test.afterAll(async () => {
    await apiContext.dispose();
  });
});
