import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';

const Index = () => {
  // Auth states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser, setCurrentUser] = useState<{username: string, role: string} | null>(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);
  
  // Login/Register forms
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ username: '', password: '', confirmPassword: '' });
  
  // Mock users database (in real app would be backend)
  const [users] = useState([
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'user1', password: 'user123', role: 'user' },
    { username: 'client1', password: 'client123', role: 'user' }
  ]);

  // Requests state
  const [requests, setRequests] = useState([
    { id: 1, steamLogin: 'player123', amount: 1000, contact: 'telegram: @player123', status: 'pending', date: '2024-01-15', userId: 'user1' },
    { id: 2, steamLogin: 'gamer456', amount: 500, contact: 'email: gamer@mail.com', status: 'approved', date: '2024-01-14', userId: 'client1' },
    { id: 3, steamLogin: 'user789', amount: 2000, contact: 'telegram: @user789', status: 'completed', date: '2024-01-13', userId: 'user1' }
  ]);

  const [newRequest, setNewRequest] = useState({
    steamLogin: '',
    amount: '',
    contact: ''
  });

  // Auth handlers
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = users.find(u => u.username === loginForm.username && u.password === loginForm.password);
    if (user) {
      setIsLoggedIn(true);
      setIsAdmin(user.role === 'admin');
      setCurrentUser({ username: user.username, role: user.role });
      setShowLoginDialog(false);
      setLoginForm({ username: '', password: '' });
    } else {
      alert('Неверный логин или пароль');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }
    if (users.find(u => u.username === registerForm.username)) {
      alert('Пользователь уже существует');
      return;
    }
    
    // In real app would save to backend
    const newUser = { username: registerForm.username, password: registerForm.password, role: 'user' };
    users.push(newUser);
    
    setIsLoggedIn(true);
    setIsAdmin(false);
    setCurrentUser({ username: newUser.username, role: newUser.role });
    setShowRegisterDialog(false);
    setRegisterForm({ username: '', password: '', confirmPassword: '' });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setCurrentUser(null);
  };

  // Request handlers
  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('Для создания заявки необходимо войти в систему');
      return;
    }
    
    const request = {
      id: requests.length + 1,
      ...newRequest,
      amount: parseInt(newRequest.amount),
      status: 'pending' as const,
      date: new Date().toISOString().split('T')[0],
      userId: currentUser?.username || ''
    };
    setRequests([...requests, request]);
    setNewRequest({ steamLogin: '', amount: '', contact: '' });
  };

  const updateRequestStatus = (id: number, status: string) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status } : req
    ));
  };

  const getUserRequests = () => {
    return requests.filter(req => req.userId === currentUser?.username);
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      case 'approved': return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      case 'completed': return 'bg-gradient-to-r from-green-500 to-emerald-500';
      case 'rejected': return 'bg-gradient-to-r from-red-500 to-pink-500';
      default: return 'bg-gradient-to-r from-gray-500 to-slate-500';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'pending': return 'В ожидании';
      case 'approved': return 'Одобрено';
      case 'completed': return 'Выполнено';
      case 'rejected': return 'Отклонено';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-10 animate-spin" style={{ animationDuration: '20s' }}></div>
      </div>
      {/* Header */}
      <header className="bg-black/40 backdrop-blur-xl border-b border-purple-500/30 relative z-10 animate-fade-in">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 group">
              <Icon name="Gamepad2" className="text-purple-400 group-hover:text-purple-300 transition-colors duration-300 group-hover:scale-110 transform" size={32} />
              <h1 className="text-2xl font-bold text-white group-hover:text-purple-200 transition-colors duration-300">SteamBoost</h1>
            </div>
            <nav className="flex items-center space-x-6">
              <a href="#services" className="text-white hover:text-purple-400 transition-all duration-300 hover:scale-105 transform relative after:absolute after:w-0 after:h-0.5 after:bg-purple-400 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">Услуги</a>
              <a href="#reviews" className="text-white hover:text-purple-400 transition-all duration-300 hover:scale-105 transform relative after:absolute after:w-0 after:h-0.5 after:bg-purple-400 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">Отзывы</a>
              <a href="#support" className="text-white hover:text-purple-400 transition-all duration-300 hover:scale-105 transform relative after:absolute after:w-0 after:h-0.5 after:bg-purple-400 after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full">Поддержка</a>
              
              {isLoggedIn ? (
                <div className="flex items-center space-x-4 animate-fade-in">
                  <span className="text-white bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 rounded-full text-sm">
                    <Icon name="User" size={16} className="inline mr-1" />
                    {currentUser?.username}
                  </span>
                  <Button onClick={handleLogout} variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transition-all duration-300 hover:scale-105 transform">
                    Выйти
                  </Button>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <Button onClick={() => setShowLoginDialog(true)} variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white transition-all duration-300 hover:scale-105 transform">
                    Вход
                  </Button>
                  <Button onClick={() => setShowRegisterDialog(true)} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 transform hover:shadow-lg hover:shadow-purple-500/25">
                    Регистрация
                  </Button>
                </div>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="bg-slate-800 border-purple-500/20">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center">
              <Icon name="LogIn" className="mr-2 text-purple-400" />
              Вход в систему
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="login-username" className="text-white">Логин</Label>
              <Input
                id="login-username"
                value={loginForm.username}
                onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                placeholder="Введите логин"
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="login-password" className="text-white">Пароль</Label>
              <Input
                id="login-password"
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                placeholder="Введите пароль"
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
            </div>
            <Alert className="bg-slate-700/50 border-purple-500/20">
              <Icon name="Info" className="h-4 w-4 text-purple-400" />
              <AlertDescription className="text-gray-300">
                Для теста: admin/admin123 или user1/user123
              </AlertDescription>
            </Alert>
            <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 transform hover:shadow-lg hover:shadow-purple-500/25">
              Войти
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Register Dialog */}
      <Dialog open={showRegisterDialog} onOpenChange={setShowRegisterDialog}>
        <DialogContent className="bg-slate-800 border-purple-500/20">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center">
              <Icon name="UserPlus" className="mr-2 text-purple-400" />
              Регистрация
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label htmlFor="register-username" className="text-white">Логин</Label>
              <Input
                id="register-username"
                value={registerForm.username}
                onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})}
                placeholder="Выберите логин"
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="register-password" className="text-white">Пароль</Label>
              <Input
                id="register-password"
                type="password"
                value={registerForm.password}
                onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                placeholder="Придумайте пароль"
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
            </div>
            <div>
              <Label htmlFor="register-confirm" className="text-white">Повторите пароль</Label>
              <Input
                id="register-confirm"
                type="password"
                value={registerForm.confirmPassword}
                onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                placeholder="Повторите пароль"
                className="bg-slate-700 border-slate-600 text-white"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 transform hover:shadow-lg hover:shadow-purple-500/25">
              Зарегистрироваться
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Hero Section */}
      <section className="py-20 text-center relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-bold text-white mb-6 animate-fade-in">
              Пополнение Steam
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse"> Быстро и Безопасно</span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Пополняем Steam кошелёк за 5 минут. Работаем 24/7. Комиссия всего 5%
            </p>
            <div className="flex justify-center space-x-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 hover:scale-105 transform transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25">
                <Icon name="Check" size={16} className="mr-2" />
                Мгновенно
              </Badge>
              <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 hover:scale-105 transform transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
                <Icon name="Shield" size={16} className="mr-2" />
                Безопасно
              </Badge>
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 hover:scale-105 transform transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25">
                <Icon name="Zap" size={16} className="mr-2" />
                Без комиссии
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <Tabs defaultValue="request" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 animate-fade-in">
            <TabsTrigger value="request" className="hover:bg-purple-500/20 transition-all duration-300">Заявка</TabsTrigger>
            <TabsTrigger value="services" className="hover:bg-purple-500/20 transition-all duration-300">Услуги</TabsTrigger>
            <TabsTrigger value="reviews" className="hover:bg-purple-500/20 transition-all duration-300">Отзывы</TabsTrigger>
            <TabsTrigger value="cabinet" disabled={!isLoggedIn} className="hover:bg-purple-500/20 transition-all duration-300">
              <Icon name="User" size={16} className="mr-2" />
              Кабинет
            </TabsTrigger>
            <TabsTrigger value="admin" disabled={!isAdmin} className="hover:bg-purple-500/20 transition-all duration-300">
              <Icon name="Settings" size={16} className="mr-2" />
              Админ
            </TabsTrigger>
          </TabsList>

          {/* Request Form */}
          <TabsContent value="request" className="animate-fade-in">
            <Card className="max-w-2xl mx-auto bg-slate-800/50 backdrop-blur-xl border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105 transform hover:shadow-2xl hover:shadow-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Icon name="CreditCard" className="mr-2 text-purple-400" />
                  Создать заявку на пополнение
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Заполните форму, и мы пополним ваш Steam кошелёк
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!isLoggedIn ? (
                  <Alert className="bg-slate-700/50 border-purple-500/20">
                    <Icon name="Lock" className="h-4 w-4 text-purple-400" />
                    <AlertDescription className="text-gray-300">
                      Для создания заявки необходимо войти в систему или зарегистрироваться
                    </AlertDescription>
                  </Alert>
                ) : (
                  <form onSubmit={handleSubmitRequest} className="space-y-4">
                    <div>
                      <Label htmlFor="steamLogin" className="text-white">Steam логин</Label>
                      <Input
                        id="steamLogin"
                        value={newRequest.steamLogin}
                        onChange={(e) => setNewRequest({...newRequest, steamLogin: e.target.value})}
                        placeholder="Введите ваш Steam логин"
                        className="bg-slate-700 border-slate-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="amount" className="text-white">Сумма пополнения (руб.)</Label>
                      <Input
                        id="amount"
                        type="number"
                        value={newRequest.amount}
                        onChange={(e) => setNewRequest({...newRequest, amount: e.target.value})}
                        placeholder="1000"
                        className="bg-slate-700 border-slate-600 text-white"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact" className="text-white">Контакты</Label>
                      <Textarea
                        id="contact"
                        value={newRequest.contact}
                        onChange={(e) => setNewRequest({...newRequest, contact: e.target.value})}
                        placeholder="Telegram: @username или email"
                        className="bg-slate-700 border-slate-600 text-white"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 transform hover:shadow-lg hover:shadow-purple-500/25">
                      <Icon name="Send" size={16} className="mr-2" />
                      Отправить заявку
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services */}
          <TabsContent value="services" className="animate-fade-in">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Icon name="Zap" className="mr-2 text-orange-400" />
                    Быстрое пополнение
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">Пополнение за 5-10 минут</p>
                  <div className="text-2xl font-bold text-white mb-2">5%</div>
                  <p className="text-gray-400">комиссия</p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Icon name="Shield" className="mr-2 text-blue-400" />
                    Безопасность
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">Гарантия безопасности аккаунта</p>
                  <div className="text-2xl font-bold text-white mb-2">100%</div>
                  <p className="text-gray-400">гарантия</p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Icon name="Clock" className="mr-2 text-green-400" />
                    Круглосуточно
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4">Работаем 24/7 без выходных</p>
                  <div className="text-2xl font-bold text-white mb-2">24/7</div>
                  <p className="text-gray-400">поддержка</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reviews */}
          <TabsContent value="reviews" className="animate-fade-in">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Icon name="Star" className="mr-2 text-yellow-400" />
                    Отличный сервис!
                  </CardTitle>
                  <CardDescription className="text-gray-300">@gamer123</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Пополнил Steam за 3 минуты. Всё честно и быстро. Рекомендую!</p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Icon name="Star" className="mr-2 text-yellow-400" />
                    Надёжно
                  </CardTitle>
                  <CardDescription className="text-gray-300">@player456</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Уже третий раз пополняю через этот сервис. Никаких проблем, всё работает отлично.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Icon name="Star" className="mr-2 text-yellow-400" />
                    Быстро и удобно
                  </CardTitle>
                  <CardDescription className="text-gray-300">@user789</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Очень удобный интерфейс, быстрое пополнение. Буду пользоваться ещё!</p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Icon name="Star" className="mr-2 text-yellow-400" />
                    Поддержка огонь
                  </CardTitle>
                  <CardDescription className="text-gray-300">@steamfan</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300">Возникли вопросы, поддержка ответила моментально. Профессионально!</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* User Cabinet */}
          <TabsContent value="cabinet" className="animate-fade-in">
            {isLoggedIn ? (
              <Card className="bg-slate-800/50 backdrop-blur-sm border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Icon name="User" className="mr-2 text-purple-400" />
                    Личный кабинет
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Ваши заявки на пополнение Steam
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {getUserRequests().length === 0 ? (
                      <Alert className="bg-slate-700/50 border-purple-500/20">
                        <Icon name="Info" className="h-4 w-4 text-purple-400" />
                        <AlertDescription className="text-gray-300">
                          У вас пока нет заявок. Создайте первую заявку во вкладке "Заявка"
                        </AlertDescription>
                      </Alert>
                    ) : (
                      getUserRequests().map((request) => (
                        <Card key={request.id} className="bg-slate-700/50 border-slate-600">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="flex items-center space-x-4">
                                  <div>
                                    <p className="text-white font-semibold">{request.steamLogin}</p>
                                    <p className="text-gray-400 text-sm">{request.contact}</p>
                                  </div>
                                  <Badge className={getStatusColor(request.status)}>
                                    {getStatusText(request.status)}
                                  </Badge>
                                </div>
                                <div className="mt-2 flex items-center space-x-4">
                                  <span className="text-green-400 font-bold">{request.amount} руб.</span>
                                  <span className="text-gray-400 text-sm">{request.date}</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Alert className="bg-slate-800/50 border-purple-500/20">
                <Icon name="Lock" className="h-4 w-4 text-purple-400" />
                <AlertDescription className="text-gray-300">
                  Для доступа к личному кабинету необходимо войти в систему
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>

          {/* Admin Panel */}
          <TabsContent value="admin" className="animate-fade-in">
            {isAdmin ? (
              <div className="space-y-6">
                <Card className="bg-slate-800/50 backdrop-blur-xl border-purple-500/20 hover:border-purple-500/40 transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Icon name="Shield" className="mr-2 text-purple-400" />
                      Панель администратора
                    </CardTitle>
                    <CardDescription className="text-gray-300">
                      Управление всеми заявками на пополнение
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {requests.map((request) => (
                        <Card key={request.id} className="bg-slate-700/50 border-slate-600">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-4">
                                  <div>
                                    <p className="text-white font-semibold">{request.steamLogin}</p>
                                    <p className="text-gray-400 text-sm">{request.contact}</p>
                                    <p className="text-gray-500 text-xs">Пользователь: {request.userId}</p>
                                  </div>
                                  <Badge className={getStatusColor(request.status)}>
                                    {getStatusText(request.status)}
                                  </Badge>
                                </div>
                                <div className="mt-2 flex items-center space-x-4">
                                  <span className="text-green-400 font-bold">{request.amount} руб.</span>
                                  <span className="text-gray-400 text-sm">{request.date}</span>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateRequestStatus(request.id, 'approved')}
                                  className="bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                  <Icon name="Check" size={16} />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateRequestStatus(request.id, 'completed')}
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                  <Icon name="CheckCheck" size={16} />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateRequestStatus(request.id, 'rejected')}
                                  className="bg-red-600 hover:bg-red-700 text-white"
                                >
                                  <Icon name="X" size={16} />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Alert className="bg-slate-800/50 border-purple-500/20">
                <Icon name="Lock" className="h-4 w-4 text-purple-400" />
                <AlertDescription className="text-gray-300">
                  Доступ к админ-панели имеют только администраторы
                </AlertDescription>
              </Alert>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Support Section */}
      <section id="support" className="py-16 bg-black/40 backdrop-blur-xl relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h3 className="text-3xl font-bold text-white mb-4">Поддержка</h3>
            <p className="text-gray-300">Нужна помощь? Мы всегда на связи!</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-slate-800/50 backdrop-blur-xl border-purple-500/20 text-center hover:border-purple-500/40 transition-all duration-500 hover:scale-105 transform hover:shadow-2xl hover:shadow-purple-500/20 animate-fade-in">
              <CardContent className="p-6">
                <Icon name="MessageCircle" className="mx-auto text-blue-400 mb-4 hover:scale-110 transition-transform duration-300" size={48} />
                <h4 className="text-white font-semibold mb-2">Telegram</h4>
                <p className="text-gray-300">@steamboost_support</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 backdrop-blur-xl border-purple-500/20 text-center hover:border-purple-500/40 transition-all duration-500 hover:scale-105 transform hover:shadow-2xl hover:shadow-purple-500/20 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-6">
                <Icon name="Mail" className="mx-auto text-green-400 mb-4 hover:scale-110 transition-transform duration-300" size={48} />
                <h4 className="text-white font-semibold mb-2">Email</h4>
                <p className="text-gray-300">support@steamboost.ru</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 backdrop-blur-xl border-purple-500/20 text-center hover:border-purple-500/40 transition-all duration-500 hover:scale-105 transform hover:shadow-2xl hover:shadow-purple-500/20 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardContent className="p-6">
                <Icon name="Phone" className="mx-auto text-purple-400 mb-4 hover:scale-110 transition-transform duration-300" size={48} />
                <h4 className="text-white font-semibold mb-2">Телефон</h4>
                <p className="text-gray-300">+7 (999) 123-45-67</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/60 backdrop-blur-xl py-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center animate-fade-in">
            <div className="flex items-center justify-center space-x-2 mb-4 group">
              <Icon name="Gamepad2" className="text-purple-400 group-hover:text-purple-300 transition-colors duration-300 group-hover:scale-110 transform" size={24} />
              <span className="text-white font-bold group-hover:text-purple-200 transition-colors duration-300">SteamBoost</span>
            </div>
            <p className="text-gray-400">© 2024 SteamBoost. Быстрое и безопасное пополнение Steam</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;